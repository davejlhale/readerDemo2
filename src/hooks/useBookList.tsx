import { useEffect, useState } from "react";

export type BooksMeta = {
  id: string;
  title: string;
  coverImage: string;
};

export function useBookList(seriesId?: string) {
  const [data, setData] = useState<BooksMeta[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId) {
      setError("No seriesId provided.");
      return;
    }

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const cleanId = seriesId.replace(/^\//, "");
        const url = `/data/${cleanId}/book-list.json`;

        console.log("Fetching:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} – ${res.statusText}`);
        }

        const json = await res.json();
        setData(json.books);
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

    fetchBooks();
  }, [seriesId]);

  return { data, loading, error };
}
