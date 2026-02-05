"use client";

import { memo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import type { Task, TaskStatus } from "@/types";

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

type TaskItemProps = {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

function TaskItemComponent({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {
  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onStatusChange(task.id, e.target.value as TaskStatus);
    },
    [task.id, onStatusChange]
  );

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(task.id, task.title, task.description);
  }, [task.id, task.title, task.description, onEdit]);

  return (
    <li
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
      data-testid="task-item"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{task.description}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            aria-label={`Task status for ${task.title}`}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button variant="ghost" type="button" onClick={handleEdit} aria-label={`Edit task ${task.title}`}>
            Edit
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDelete}
            aria-label={`Delete task ${task.title}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export const TaskItem = memo(TaskItemComponent);
