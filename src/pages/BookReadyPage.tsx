/**
 * NOTE ON FUTURE ARCHITECTURE
 * --------------------------------------------------
 * BookReadyPage currently acts as a staging screen:
 * - It loads the book JSON
 * - It preloads the first 1–2 pages
 * - It unlocks "Let's Read" once the reader is guaranteed to render
 * - It gives us a clean place to debug loading behaviour
 *
 * However, this page is not strictly required in the long term.
 *
 * Once the ReaderPage becomes responsible for:
 *   • loading the starting page immediately (page 1 or last-read page)
 *   • running the priority-based preload strategy (start → forward → backward)
 *   • showing placeholders until images arrive
 *   • tracking reading behaviour and progress
 *
 * …then BookReadyPage can be merged into ReaderPage entirely.
 *
 * In that future design:
 *   - "Read" simply opens ReaderPage at page 1
 *   - "Continue Reading" opens ReaderPage at the user's last-read page
 *   - ReaderPage loads the required page first, then preloads the rest
 *   - No separate staging screen is needed
 *
 * Keeping BookReadyPage for now is intentional:
 *   • It isolates preload logic while we refine it
 *   • It gives us a safe place to experiment with loading UX
 *   • It avoids complicating ReaderPage during early development
 *
 * When the reader engine is mature, this page can be removed cleanly.
 * The reader will become both the staging and reading experience.
 */
//import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookTextRetrieval } from "../hooks/useBookTextRetrieval";

export function BookReadyPage() {
  const { seriesId, bookId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    initialReady,
    backgroundLoading,
    loadedCount,
    totalPages,
    error,
  } = useBookTextRetrieval(seriesId, bookId);

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
        <div className="tiny-loader">
          Preparing page {loadedCount + 1} of {totalPages}…
        </div>
      )}

      {/* 4. Button unlocks as soon as initialReady flips true */}
      <button
        disabled={!initialReady}
        className={initialReady ? "ready" : "disabled"}
        // onClick={() => navigate(`/reader/${seriesId}/${bookId}`)}
        onClick={() => navigate(`/`)}
      >
        Let’s Read
      </button>

      {/* 5. Background loading continues silently */}
      {backgroundLoading && (
        <div className="tiny-loader">
          Loaded {loadedCount}/{totalPages} pages…
        </div>
      )}
    </div>
  );
}
