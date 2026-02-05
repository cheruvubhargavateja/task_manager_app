"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ComponentType } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * HOC that protects a page: redirects to /login if not authenticated.
 * Use for dashboard and any route that requires login.
 */
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithAuthComponent(props: P) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900" aria-busy="true" aria-label="Checking authentication">
          <p className="text-zinc-600 dark:text-zinc-400">Redirecting to login...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  }

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;
  return WithAuthComponent;
}
