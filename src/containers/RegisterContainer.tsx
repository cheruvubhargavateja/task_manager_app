"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RegisterForm } from "@/components/auth/RegisterForm";

export function RegisterContainer() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

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

  const handleSubmit = useCallback(
    (credentials: { name: string; email: string; password: string }) => {
      const result = register(credentials);
      if (result.success) {
        router.replace("/dashboard");
      }
      return result;
    },
    [register, router]
  );

  return <RegisterForm onSubmit={handleSubmit} />;
}
