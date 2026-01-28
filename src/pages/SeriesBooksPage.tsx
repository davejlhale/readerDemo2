/**
 * SeriesBooksPage
 * --------------------------------------------------
 * Route: /series/:seriesId
 *
 * Purpose:
 * - Shows all books within a selected series
 * - Allows the user to choose a specific book to read
 *
 * Should contain:
 * - List/grid of bookcards of each book in the series (image and reading stage)
 * - Navigation to BookReadyPage
 *
 * Should NOT contain:
 * - Series overview / pedagogy text
 * - Reading UI or page-by-page logic
 * - Deep explanation of the series (belongs in SeriesDetailPage)
 */
/**
 * SeriesIndexPage
 * --------------------------------------------------
 * Route: /series
 *
 * Purpose:
 * - Displays a list of all available reading series
 * - Acts as the primary browsing / discovery page
 *
 * Should contain:
 * - Grid or list of series cards (minimal info and image)
 * - Navigation to SeriesBooksPage
 * - Optional link to SeriesDetailPage (about/info)
 *
 * Should NOT contain:
 * - Book-level logic
 * - Reading logic
 * - Series pedagogy explanations (belongs in SeriesDetailPage)
 */
import { useNavigate, useParams } from "react-router-dom";
import { useBookList } from "../hooks/useBookList";
import { BookCard } from "../components/cards/BookCard";
import { useEffect } from "react";
import { useBookPreloader } from "../hooks/useBookPreloader";
import "../styles/series-index.css"; //needs a series-books.css fully done one day
import "../styles/series-books.css";
export function SeriesBooksPage() {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  const { preloadBook, progress } = useBookPreloader();
  const { data, loading, error } = useBookList(seriesId);

  useEffect(() => {
    if (!seriesId) {
      navigate("/error", {
        state: {
          seriesId,
          message: "No seriesId provided.",
          source: "SeriesBooksPage",
        },
      });
    }
  }, [seriesId, navigate]);

  useEffect(() => {
    if (error) {
      navigate("/error", {
        state: {
          seriesId,
          message: error,
          source: "SeriesBooksPage",
        },
      });
    }
  }, [error, navigate, seriesId]);

  if (loading) return <p>Loading…</p>;
  if (!data) return null; // navigation will handle

  return (
    <main className="series-index-page">
      <section className="series-list">
        <h1>Book Series</h1>

        <div className="series-row">
          {data.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              seriesId={seriesId!}
              imageBasePath={book.coverImage}
              onSelect={() => navigate(`/reader/${seriesId}/${book.id}/1`)}
              onPreload={() => preloadBook(seriesId!, book.id)}
              preloadState={progress[book.id] ?? "idle"}
            >
              {/* <img alt="preloadicon"></img> */}
            </BookCard>
          ))}
        </div>
      </section>
    </main>
  );
}
