import { useEffect, useState } from "react";

export type SeriesMeta = {
  id: string;
  title: string;
  cardImage: string;
};

export function useSeriesIndex() {
  const [data, setData] = useState<SeriesMeta[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/series.index.json")
      .then((r) => r.json())
      .then((json) => {
        setData(json.series);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
