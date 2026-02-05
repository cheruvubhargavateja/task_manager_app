"use client";

import { memo } from "react";
import { TaskItem } from "./TaskItem";
import type { Task, TaskStatus } from "@/types";

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

function TaskListComponent({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-zinc-500 dark:text-zinc-400" data-testid="task-list-empty">
        No tasks yet. Add one above.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3" data-testid="task-list" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export const TaskList = memo(TaskListComponent);
