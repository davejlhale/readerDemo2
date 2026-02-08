import { AppError } from "../utility/errors/AppError";

let cache = new Map();

export function useBookList(seriesId?: string) {
  if (!seriesId) throw new Error("missing-series-id");

  const cached = cache.get(seriesId);

  if (cached) {
    if (cached.error) throw cached.error;
    if (cached.data) return cached.data;
    throw cached.promise;
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
      if (err instanceof AppError) {
        // Real content error — cache it
        entry.error = err;
      } else {
        // Likely offline
        entry.error = new AppError("OFFLINE", { seriesId });
      }
    });

  cache.set(seriesId, entry);

  throw entry.promise;
}
