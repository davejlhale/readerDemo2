/**
 * NOTE ON FUTURE ARCHITECTURE
 * --------------------------------------------------
 * ReaderPage is intended to become the single, unified
 * reading engine for the entire app. In the long term,
 * this page will replace BookReadyPage entirely.
 *
 * Today, ReaderPage assumes that BookReadyPage has:
 *   • loaded the book JSON
 *   • preloaded the first 1–2 pages
 *   • ensured the reader can render immediately
 *
 * But once ReaderPage supports:
 *   • starting at any page (1 or last-read)
 *   • loading the starting page immediately
 *   • priority-based preloading:
 *        - startPage first
 *        - then forward (start+1 → end)
 *        - then backward (start-1 → 1)
 *   • showing placeholders until images arrive
 *   • tracking reading behaviour (time on page, etc.)
 *   • updating last-read progress in the database
 *
 * …then BookReadyPage becomes unnecessary.
 *
 * In that future design:
 *   - "Read" opens ReaderPage at page 1
 *   - "Continue Reading" opens ReaderPage at the user's last-read page
 *   - ReaderPage handles all loading, caching, and UX staging internally
 *   - No separate staging screen is required
 *
 * Keeping BookReadyPage for now is intentional:
 *   • It isolates preload logic while we refine it
 *   • It keeps ReaderPage simpler during early development
 *   • It allows us to debug loading behaviour without affecting the reader UI
 *
 * When the reader engine is mature, ReaderPage will absorb
 * all staging responsibilities and BookReadyPage can be removed.
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData } from "../hooks/useBookData";

export function ReaderPage() {
  const { seriesId, bookId, pageNumber } = useParams();
  const startPage = Number(pageNumber);

  const { data: book, error } = useBookData(seriesId, bookId);
  const [currentPage, setCurrentPage] = useState(startPage);

  // Only now is it safe to build safePages
  const safePages = book?.pages.map((p) => ({
    page: Number(p.pageNumber),
    imageBaseURL: p.imageBaseURL,
  }));

  // Only now is it safe to call the preloader hook
  const { loadedPages } = usePriorityPreloader(currentPage, safePages);
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Loading…</p>;
  return (
    <>
      <h1>{book.title}</h1>
      <p>Current page: {currentPage}</p>
      <p>Loaded pages: {Array.from(loadedPages).join(", ")}</p>

      <button onClick={() => setCurrentPage((p) => p - 1)}>Prev</button>
      <button onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
    </>
  );
}
