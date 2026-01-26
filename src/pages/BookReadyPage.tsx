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
import { useNavigate, useParams } from "react-router-dom";
//import { useBookTextRetrieval } from "../hooks/useBookTextRetrieval";

export function BookReadyPage() {
  const { seriesId, bookId } = useParams<{
    seriesId: string;
    bookId: string;
  }>();

  return (
    <>
      {console.log(`seriesId ${seriesId},bookId ${bookId}`)}
      <h1>
        BookReadyPage {seriesId}
        {bookId}
      </h1>
    </>
  );
}
