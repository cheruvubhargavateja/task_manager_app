"use client";

import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type AddTaskFormProps = {
  onAdd: (title: string, description: string) => void;
};

function AddTaskFormComponent({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return;
      onAdd(trimmedTitle, description.trim());
      setTitle("");
      setDescription("");
    },
    [title, description, onAdd]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
      data-testid="add-task-form"
    >
      <Input
        type="text"
        name="taskTitle"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        aria-label="Task title"
      />
      <input
        type="text"
        name="taskDescription"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
        aria-label="Task description"
      />
      <Button type="submit" className="w-full sm:w-auto">
        Add task
      </Button>
    </form>
  );
}

export const AddTaskForm = memo(AddTaskFormComponent);
