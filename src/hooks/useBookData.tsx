import { useEffect, useState } from "react";

export type BookTextData = {
  id: string;
  seriesId: string;
  title: string;
  pages: {
    pageNumber: string;
    imageBaseURL: string;
    lines: string[];
    metaData: string;
  }[];
};

export function useBookData(seriesId?: string, bookId?: string) {
  const [data, setData] = useState<BookTextData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId || !bookId) {
      setError("Missing seriesId or bookId");
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const url = `/data/${seriesId}/${bookId}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [seriesId, bookId]);

  return { data, error };
}
