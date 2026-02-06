import { AppError } from "../utility/errors/AppError";

export type SeriesMeta = {
  id: string;
  title: string;
  cardImage: string;
};
let cache = new Map();

export function useSeriesIndex() {
  const key = "series-index";
  if (cache.has(key)) {
    const entry = cache.get(key);
    if (entry.error) throw entry.error;
    if (entry.data) return entry.data;
    throw entry.promise;
  }

  const entry: any = {};
  entry.promise = fetch(`/data/series-index.json`)
    .then((res) => {
      if (!res.ok) {
        throw new AppError("NETWORK_ERROR");
      }

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new AppError("SERIES_LIST_MISSING");
      }

      return res.json();
    })
    .then((json) => {
      entry.data = json.series;
    })
    .catch((err) => {
      entry.error =
        err instanceof AppError ? err : new AppError("NETWORK_ERROR");
    });

  cache.set(key, entry);

  throw entry.promise;
}
