import { useMemo } from "react";
import { BAND_ORDER } from "../_CONSTANTS/constants";
import type { BooksMeta } from "../_CONSTANTS/constants";

export function useSortedBooks(books: BooksMeta[] | null) {
  return useMemo(() => {
    if (!books) return [];

    return books.slice().sort((a, b) => {
      const bandDiff = BAND_ORDER[a.band] - BAND_ORDER[b.band];
      if (bandDiff !== 0) return bandDiff;
      return a.numericScore - b.numericScore;
    });
  }, [books]);
}
