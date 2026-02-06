import { AppError } from "../utility/errors/AppError";

let cache = new Map();

export function useBookList(seriesId?: string) {
  if (!seriesId) throw new Error("missing-series-id");

  if (cache.has(seriesId)) {
    const entry = cache.get(seriesId);
    if (entry.error) throw entry.error;
    if (entry.data) return entry.data;
    throw entry.promise;
  }

  const entry: any = {};
  entry.promise = fetch(`/data/${seriesId}/book-list.json`)
    .then((r) => {
      if (!r.ok) {
        throw new AppError("NETWORK_ERROR");
      }

      const contentType = r.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new AppError("MISSING_SERIES_ID", { seriesId });
      }

      return r.json();
    })
    .then((json) => {
      entry.data = json.books;
    })
    .catch((err) => {
      entry.error =
        err instanceof AppError ? err : new AppError("NETWORK_ERROR");
    });

  cache.set(seriesId, entry);

  throw entry.promise;
}
