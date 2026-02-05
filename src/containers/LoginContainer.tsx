"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginContainer() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(
    (credentials: { email: string; password: string }) => {
      const result = login(credentials);
      if (result.success) {
        router.replace("/dashboard");
      }
      return result;
    },
    [login, router]
  );

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center" aria-busy="true">
        <p className="text-zinc-600 dark:text-zinc-400">Redirecting...</p>
      </div>
    );
  }

  return <LoginForm onSubmit={handleSubmit} />;
}
