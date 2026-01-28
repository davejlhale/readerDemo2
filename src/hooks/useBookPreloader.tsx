// src/hooks/useBookPreloader.ts
import { useState } from "react";

export function useBookPreloader() {
  const [progress, setProgress] = useState<
    Record<string, "idle" | "loading" | "done">
  >({});

  async function preloadBook(seriesId: string, bookId: string) {
    console.log(`trying to load ${seriesId} - ${bookId}`);
    setProgress((p) => ({ ...p, [bookId]: "loading" }));

    // simulate preload for now
    await new Promise((resolve) => setTimeout(resolve, 800));

    setProgress((p) => ({ ...p, [bookId]: "done" }));
  }

  return { preloadBook, progress };
}
