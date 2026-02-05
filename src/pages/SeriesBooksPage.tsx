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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useBookList } from "../hooks/useBookList";
import { BookCoverCard } from "../components/cards/BookCoverCard";
import { useBookPreloader } from "../hooks/useBookPreloader";
import "../styles/series-index.css"; //needs a series-books.css fully done one day
import "../styles/BookCardControlPanel.css";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";
import { useSortedBooks } from "../hooks/useSortedBooks";
export function SeriesBooksPage() {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  const { preloadBook, progress } = useBookPreloader();
  const data = useBookList(seriesId);
  const location = useLocation();

  const sortedBooks = useSortedBooks(data);

  if (!data) return null; // navigation will handle

  console.log("DATA", data);
  console.log("sorted", sortedBooks);

  return (
    <main className="series-index-wrapper">
      <section className="series-list">
        <div className="series-list-header">
          <h1>Series Book List</h1>

          <NavigateBackButton fallbackRoute="/series" />
        </div>

        <div className="series-row-wrapper">
          <div className="series-row">
            {sortedBooks.map((book) => {
              // console.log(book);

              return (
                <BookCoverCard
                  key={book.id}
                  title={book.title}
                  seriesId={seriesId!}
                  band={book.band}
                  imageBasePath={book.coverImage}
                  onSelect={() =>
                    navigate(`/reader/${seriesId}/${book.id}/1`, {
                      state: { from: location.pathname },
                    })
                  }
                  onPreload={() => preloadBook(seriesId!, book.id)}
                  preloadState={progress[book.id] ?? "idle"}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
