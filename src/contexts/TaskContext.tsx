"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { storage } from "@/utils/storage";
import { useAuthContext } from "@/contexts/AuthContext";
import type { Task, TaskStatus } from "@/types";
import { generateId } from "@/utils/id";

type TaskContextValue = {
  tasks: Task[];
  addTask: (title: string, description: string) => Task;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, payload: { title?: string; description?: string; status?: TaskStatus }) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextValue | null>(null);

function getTasksKey(userId: string): string {
  return `${storage.keys.TASKS}_${userId}`;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    const key = getTasksKey(user.id);
    const stored = storage.getItem<Task[]>(key) ?? [];
    setTasks(stored);
  }, [user?.id]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const persistTasks = useCallback(
    (nextTasks: Task[]) => {
      if (!user) return;
      storage.setItem(getTasksKey(user.id), nextTasks);
    },
    [user?.id]
  );

  const addTask = useCallback(
    (title: string, description: string): Task => {
      if (!user) throw new Error("User not authenticated");
      const now = new Date().toISOString();
      const task: Task = {
        id: generateId(),
        title,
        description,
        status: "todo",
        createdAt: now,
        updatedAt: now,
        userId: user.id,
      };
      setTasks((prev) => {
        const next = [...prev, task];
        persistTasks(next);
        return next;
      });
      return task;
    },
    [user, persistTasks]
  );

  const updateTaskStatus = useCallback(
    (id: string, status: TaskStatus) => {
      setTasks((prev) => {
        const next = prev.map((t) =>
          t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
        );
        persistTasks(next);
        return next;
      });
    },
    [persistTasks]
  );

  const updateTask = useCallback(
    (id: string, payload: { title?: string; description?: string; status?: TaskStatus }) => {
      setTasks((prev) => {
        const next = prev.map((t) => {
          if (t.id !== id) return t;
          return {
            ...t,
            ...payload,
            updatedAt: new Date().toISOString(),
          };
        });
        persistTasks(next);
        return next;
      });
    },
    [persistTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const next = prev.filter((t) => t.id !== id);
        persistTasks(next);
        return next;
      });
    },
    [persistTasks]
  );

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      addTask,
      updateTaskStatus,
      updateTask,
      deleteTask,
    }),
    [tasks, addTask, updateTaskStatus, updateTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
}
