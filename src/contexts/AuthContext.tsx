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
import type { AuthState, LoginCredentials, RegisterCredentials, User } from "@/types";
import type { StoredUser } from "@/types";
import { generateId } from "@/utils/id";

type AuthContextValue = AuthState & {
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  register: (credentials: RegisterCredentials) => { success: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const loadStoredUser = useCallback(() => {
    const user = storage.getItem<User>(storage.keys.AUTH_USER);
    if (user) {
      setState({ user, isAuthenticated: true });
    }
  }, []);

  useEffect(() => {
    loadStoredUser();
  }, [loadStoredUser]);

  const login = useCallback((credentials: LoginCredentials) => {
    const users = storage.getItem<StoredUser[]>(storage.keys.USERS) ?? [];
    const found = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password." };
    }
    const user: User = { id: found.id, email: found.email, name: found.name };
    storage.setItem(storage.keys.AUTH_USER, user);
    setState({ user, isAuthenticated: true });
    return { success: true };
  }, []);

  const register = useCallback((credentials: RegisterCredentials) => {
    const users = storage.getItem<StoredUser[]>(storage.keys.USERS) ?? [];
    if (users.some((u) => u.email === credentials.email)) {
      return { success: false, error: "Email already registered." };
    }
    const newUser: StoredUser = {
      id: generateId(),
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
    };
    storage.setItem(storage.keys.USERS, [...users, newUser]);
    const user: User = { id: newUser.id, email: newUser.email, name: newUser.name };
    storage.setItem(storage.keys.AUTH_USER, user);
    setState({ user, isAuthenticated: true });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    storage.removeItem(storage.keys.AUTH_USER);
    setState({ user: null, isAuthenticated: false });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      register,
      logout,
    }),
    [state.user, state.isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
