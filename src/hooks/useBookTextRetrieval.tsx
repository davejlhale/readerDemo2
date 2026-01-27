import { useEffect, useState } from "react";

export type BookTextData = {
  id: string;
  seriesId: string;
  title: string;
  cover: string;
  pages: {
    pageNumber: string;
    imageBaseURL: string;
    lines: string[];
    metaData: string;
  }[];
};

export function useBookTextRetrieval(seriesId?: string, bookId?: string) {
  const [data, setData] = useState<BookTextData | null>(null);
  const [initialReady, setInitialReady] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const READY_COUNT = 2; // or whatever you want

  useEffect(() => {
    if (!seriesId || !bookId) {
      setError("Missing seriesId or bookId");
      return;
    }

    let cancelled = false;

    async function loadJson() {
      try {
        setError(null);

        const url = `/data/${seriesId}/${bookId}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (!cancelled) setData(json);

        // Start image loading
        console.log(json.pages);
        preloadImages(json.pages);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    function preloadImages(pages: BookTextData["pages"]) {
      console.log(pages);
      let loadedCount = 0;
      const fileType = ".png";
      pages.forEach((page, index) => {
        const img = new Image();
        img.src = page.imageBaseURL + fileType;
        console.log(img.src);
        img.onload = () => {
          loadedCount++;

          // First N pages ready → unlock UI
          if (!initialReady && loadedCount >= READY_COUNT) {
            setInitialReady(true);
          }

          // When loading beyond READY_COUNT → background mode
          if (loadedCount === READY_COUNT) {
            setBackgroundLoading(true);
          }

          // When all pages done
          if (loadedCount === pages.length) {
            setBackgroundLoading(false);
          }
        };

        img.onerror = () => {
          console.warn("Image failed:", img.src);
        };
      });
    }

    loadJson();
    return () => {
      cancelled = true;
    };
  }, [seriesId, bookId]);

  return { data, initialReady, backgroundLoading, error };
}
