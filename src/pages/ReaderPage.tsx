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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData } from "../hooks/useBookData";

export function ReaderPage() {
  const { seriesId, bookId, pageNumber } = useParams();
  const startPage = Number(pageNumber);

  const { data: book, error } = useBookData(seriesId, bookId);
  const [currentPage, setCurrentPage] = useState(startPage);

  // Always compute these, even before book loads
  const totalPages = book?.pages.length ?? 0;
  const maxPage = totalPages + 1;

  // Fix invalid URL page param AFTER book loads
  useEffect(() => {
    if (!book) return;

    const start = Number(pageNumber);
    if (start < 1 || start > maxPage) {
      setCurrentPage(1);
    }
  }, [book, pageNumber, maxPage]);

  // Preloader (must always run in same order)
  const safePages = book
    ? book.pages.map((p) => ({
        page: Number(p.pageNumber),
        imageBaseURL: p.imageBaseURL,
      }))
    : [];

  const { loadedPages } = usePriorityPreloader(currentPage, safePages);

  // Now we can safely render
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>Loading…</p>;
  }

  const page = book.pages[currentPage - 1];
  const isLoaded = loadedPages.has(currentPage);
  return (
    <>
      <h1>{book.title}</h1>
      <p>Current page: {currentPage}</p>
      <p>Loaded pages: {Array.from(loadedPages).join(", ")}</p>

      {/* TEXT BLOCK */}
      {currentPage <= totalPages && (
        <div style={{ margin: "1rem 0" }}>
          {page.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      {/* IMAGE BLOCK */}
      {currentPage <= totalPages && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            style={{ maxHeight: "200px", display: "block" }}
            src={page.imageBaseURL}
            alt={`Page ${currentPage}`}
            onError={(e) => {
              e.currentTarget.src = "/images/generic/books/coming-soon.webp";
            }}
          />

          {!isLoaded && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(0,0,0,0.4)",
                color: "white",
                padding: "4px 6px",
                borderRadius: "4px",
                fontSize: "0.75rem",
              }}
            >
              Loading…
            </div>
          )}
        </div>
      )}

      {/* END PAGE */}
      {currentPage === maxPage && (
        <img src="/images/generic/books/the-end.webp" alt="The End" />
      )}

      {/* NAVIGATION */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <button
        onClick={() => setCurrentPage((p) => Math.min(maxPage, p + 1))}
        disabled={currentPage >= maxPage}
      >
        Next
      </button>
    </>
  );
}
