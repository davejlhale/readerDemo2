import { useEffect, useRef, useState } from "react";

const MAX_CONCURRENT = 2;

// -----------------------------------------------------
// Build alternating priority order
// -----------------------------------------------------
function buildInitialLoadOrder(start: number, total: number): number[] {
  const order: number[] = [start];

  let forward = start + 1;
  let backward = start - 1;

  const forwardWeight = 4;
  let forwardCount = 0;

  while (forward <= total || backward >= 1) {
    if (forward <= total && forwardCount < forwardWeight) {
      order.push(forward++);
      forwardCount++;
      continue;
    }

    if (backward >= 1) {
      order.push(backward--);
      forwardCount = 0;
      continue;
    }

    if (forward <= total) {
      order.push(forward++);
      forwardCount++;
    }
  }

  return order;
}

// -----------------------------------------------------
// Load a single image
// -----------------------------------------------------
function loadPageImage(url: string | null): Promise<void> {
  return new Promise((resolve) => {
    if (!url) {
      resolve();
      return;
    }
    const img = new Image();
    img.src = url;

    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}

// -----------------------------------------------------
// Kindle-style concurrency-limited preloader
// -----------------------------------------------------
export function usePriorityPreloader(
  currentPage: number,
  safePages: { page: number; imageBaseURL: string | null }[] | undefined,
) {
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const loadedRef = useRef<Set<number>>(new Set());
  const queueRef = useRef<number[]>([]);
  const workersRef = useRef<number>(0);

  const markLoaded = (pageNum: number) => {
    loadedRef.current.add(pageNum);
    setLoadedPages(new Set(loadedRef.current));
  };

  // Worker loop
  const runWorker = async () => {
    workersRef.current++;

    while (true) {
      const next = queueRef.current.shift();
      if (next === undefined) break;

      if (loadedRef.current.has(next)) continue;

      const page = safePages?.find((p) => p.page === next);
      if (!page) continue;

      await loadPageImage(page.imageBaseURL);
      markLoaded(next);
    }

    workersRef.current--;
  };

  // Rebuild queue whenever currentPage changes
  useEffect(() => {
    if (!safePages || safePages.length === 0) return;

    const total = safePages.length;
    const order = buildInitialLoadOrder(currentPage, total);

    // Reset queue
    queueRef.current = order.filter((p) => !loadedRef.current.has(p));

    // Start workers if needed
    while (workersRef.current < MAX_CONCURRENT && queueRef.current.length > 0) {
      runWorker();
    }
  }, [currentPage, safePages]);

  return { loadedPages };
}
