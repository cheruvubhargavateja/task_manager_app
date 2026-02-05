"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/Button";
import { AddTaskForm } from "@/components/tasks/AddTaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";

export function DashboardContainer() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTaskStatus, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);

  const handleAddTask = useCallback(
    (title: string, description: string) => {
      addTask(title, description);
    },
    [addTask]
  );

  const handleStatusChange = useCallback(
    (id: string, status: Parameters<typeof updateTaskStatus>[1]) => {
      updateTaskStatus(id, status);
    },
    [updateTaskStatus]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTask(id);
      if (editingTask?.id === id) setEditingTask(null);
    },
    [deleteTask, editingTask?.id]
  );

  const handleEdit = useCallback((id: string, title: string, description: string) => {
    setEditingTask({ id, title, description });
  }, []);

  const handleSaveEdit = useCallback(
    (id: string, title: string, description: string) => {
      updateTask(id, { title, description });
      setEditingTask(null);
    },
    [updateTask]
  );

  const handleCloseModal = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400" aria-label="Logged in as">
              {user?.name ?? user?.email}
            </span>
            <Button variant="ghost" onClick={handleLogout} aria-label="Sign out">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <AddTaskForm onAdd={handleAddTask} />
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </main>

      {editingTask && (
        <EditTaskModal
          taskId={editingTask.id}
          initialTitle={editingTask.title}
          initialDescription={editingTask.description}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
