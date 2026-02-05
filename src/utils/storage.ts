import { STORAGE_KEYS } from "@/constants/storage";

const isClient = typeof window !== "undefined";

function getItem<T>(key: string): T | null {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function removeItem(key: string): void {
  if (!isClient) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const storage = {
  getItem,
  setItem,
  removeItem,
  keys: STORAGE_KEYS,
};
