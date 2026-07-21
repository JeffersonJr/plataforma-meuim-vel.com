import { useEffect, useState } from "react";

const KEY = "mi.favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(read());
    const l = () => setIds(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const toggle = (id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
  };

  return { ids, toggle, isFav: (id: string) => ids.includes(id) };
}
