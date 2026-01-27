import { useEffect, useState } from "react";
import type { BookTextData } from "./useBookTextRetrieval";

export function useSequentialImagePreload(
  pages: BookTextData["pages"] | undefined,
  READY_COUNT: number,
) {
  const [initialReady, setInitialReady] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  // ⭐ NEW: track progress
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!pages || pages.length === 0) return;

    const safePages = pages;
    let cancelled = false;

    setTotalPages(safePages.length); // ⭐ set total immediately

    async function preload() {
      const total = safePages.length;
      const fileType = ".png";

      for (let i = 0; i < total; i++) {
        const url = safePages[i].imageBaseURL + fileType;

        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;

          img.onload = () => {
            if (cancelled) return;

            // ⭐ update progress
            setLoadedCount((prev) => prev + 1);

            if (i + 1 >= READY_COUNT && !initialReady) {
              setInitialReady(true);
            }

            if (i + 1 === READY_COUNT) {
              setBackgroundLoading(true);
            }

            if (i + 1 === total) {
              setBackgroundLoading(false);
            }

            resolve();
          };

          img.onerror = () => resolve();
        });
      }
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, [pages, READY_COUNT]);

  return {
    initialReady,
    backgroundLoading,
    loadedCount, // ⭐ expose progress
    totalPages, // ⭐ expose total
  };
}
