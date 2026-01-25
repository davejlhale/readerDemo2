import { useEffect, useState } from "react";

export type BooksMeta = {
  id: string;
  title: string;
  coverImage: string;
};

export function useBookList(seriesId?: string) {
  const [data, setData] = useState<BooksMeta[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seriesId) return;
    setLoading(true);
    setError(null);
    const url = `/data/${seriesId}/book-list.json`;
    console.log("Fetching:", url);

    console.log(`data/${seriesId}/book-list.json`);
    const cleanId = seriesId?.replace(/^\//, "");

    const burl = `/data/${cleanId}/book-list.json`;
    console.log("clean " + burl);
    fetch(burl)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP ${r.status} – ${r.statusText}`);
        }
        return r.json();
      })
      .then((json) => {
        console.log(JSON.stringify(json, null, 2));

        setData(json.books);
        console.log(json.books);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        setLoading(false);
      });
  }, [seriesId]);

  return { data, loading, error };
}
