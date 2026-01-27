import { useEffect, useState, useCallback } from "react";

// -----------------------------------------------------
// Build alternating priority order: X, X+1, X-1, X+2, X-2...
// -----------------------------------------------------
function buildInitialLoadOrder(start: number, total: number): number[] {
  const order: number[] = [start];
  let forward = start + 1;
  let backward = start - 1;

  while (forward <= total || backward >= 1) {
    if (forward <= total) order.push(forward++);
    if (backward >= 1) order.push(backward--);
  }

  return order;
}

// -----------------------------------------------------
// Minimal loader (replace with storage-aware loader later)
// -----------------------------------------------------
function loadPageImage(page: { page: number; imageBaseURL: string }) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = page.imageBaseURL;
    img.onload = () => resolve();
    img.onerror = () =>
      reject(new Error(`Failed to load image: ${page.imageBaseURL}`));
  });
}

// -----------------------------------------------------
// The Hook
// -----------------------------------------------------
export function usePriorityPreloader(
  currentPage: number,
  safePages: { page: number; imageBaseURL: string }[] | undefined,
) {
  // 1. Always create state
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  // 2. Always create callback
  const preloadInOrder = useCallback(
    async (order: number[]) => {
      if (!safePages || safePages.length === 0) return;

      for (const pageNum of order) {
        if (loadedPages.has(pageNum)) continue;

        const page = safePages.find((p) => p.page === pageNum);
        if (!page) continue;

        await loadPageImage(page);

        setLoadedPages((prev) => {
          const next = new Set(prev);
          next.add(pageNum);
          return next;
        });

        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    },
    [loadedPages, safePages],
  );

  // 3. Always create effect
  useEffect(() => {
    if (!safePages || safePages.length === 0) return;

    const totalPages = safePages.length;
    const order = buildInitialLoadOrder(currentPage, totalPages);

    preloadInOrder(order);
  }, [currentPage, safePages, preloadInOrder]);

  // 4. Always return the same shape
  return { loadedPages };
}
