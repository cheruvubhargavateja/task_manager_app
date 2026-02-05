"use client";

import { memo, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

function ButtonComponent({
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClass = variantClasses[variant];

  return (
    <button
      type="button"
      className={`${base} ${variantClass} ${className}`}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled ?? isLoading}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export const Button = memo(ButtonComponent);
