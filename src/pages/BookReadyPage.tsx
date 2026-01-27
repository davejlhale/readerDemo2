/**
 * BookReadyPage
 * --------------------------------------------------
 * Route: /series/:seriesId/book/:bookId
 *
 * Purpose:
 * - Transitional staging page between book selection and reading
 * - Prepares book data without blocking user navigation
 *
 * Behaviour:
 * - Begins loading book metadata and page content on mount
 * - Prioritises loading page 1 (and optionally page 2)
 * - Enables "Let's read" as soon as page 1 is ready
 * - Continues loading remaining pages silently in the background
 * - Yields control to the user as early as possible
 *
 * UX guarantees:
 * - User can always return to the series book list
 * - Navigation is never blocked by background loading
 * - ReaderPage is entered only when page 1 is available
 *
 * Should contain:
 * - Book cover and summary
 * - Loading / preparation status
 * - "Let's read" action (gated by page 1 readiness)
 * - Link back to SeriesBooksPage
 *
 * Should NOT contain:
 * - Page-by-page reading UI
 * - Assumptions that all pages are loaded
 * - Reader navigation or pagination logic
 */
//import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookTextRetrieval } from "../hooks/useBookTextRetrieval";

export function BookReadyPage() {
  const { seriesId, bookId } = useParams();
  const navigate = useNavigate();

  const { data, initialReady, backgroundLoading, error } = useBookTextRetrieval(
    seriesId,
    bookId,
  );

  useEffect(() => {
    if (error) {
      navigate("/error", {
        state: { seriesId, message: error, source: "BookReadyPage" },
      });
    }
  }, [error, navigate, seriesId]);

  // 1. JSON not loaded yet → show loading
  if (!data) {
    return <div>Loading book…</div>;
  }

  // 2. JSON loaded → show book info immediately
  return (
    <div>
      <h1>{data.title}</h1>

      {/* 3. Show preparation status until initial pages are ready */}
      {!initialReady && (
        <div className="tiny-loader">Preparing first pages…</div>
      )}

      {/* 4. Button unlocks as soon as initialReady flips true */}
      <button
        disabled={!initialReady}
        className={initialReady ? "ready" : "disabled"}
        onClick={() => navigate(`/reader/${seriesId}/${bookId}`)}
      >
        Let’s Read
      </button>

      {/* 5. Background loading continues silently */}
      {backgroundLoading && (
        <div className="tiny-loader">Loading remaining pages…</div>
      )}
    </div>
  );
}
