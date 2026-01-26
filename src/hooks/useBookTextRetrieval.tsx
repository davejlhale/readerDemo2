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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId || !bookId) {
      setError("Missing seriesId or bookId");
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `/data/${seriesId}/${bookId}.json`;

        const res = await fetch(url);

        if (!res.ok) {
          console.log("resource fetch failed");
          throw new Error(`HTTP ${res.status} – ${res.statusText}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [seriesId, bookId]);

  return { data, loading, error };
}
