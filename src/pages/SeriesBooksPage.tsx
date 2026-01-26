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
import { SeriesImageCard } from "../components/cards/SeriesImageCard";
import "../styles/series-index.css";

export function SeriesBooksPage() {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  console.log(seriesId + " book id being looked for");
  const { data, loading, error } = useBookList(seriesId);

  if (loading) return <p>Loading…</p>;
  if (!seriesId) {
    navigate("/error", {
      state: {
        seriesId,
        message: `Book Series ${seriesId} Not Found.`,
        source: "SeriesBooksPage",
      },
    });

    return null;
  }

  if (error || !data) {
    navigate("/error", {
      state: {
        seriesId,
        message: `Book list for ${seriesId} returned no data.`,
        source: "SeriesBooksPage",
      },
    });

    return null;
  }

  return (
    <main className="series-index-page">
      <section className="series-list">
        <h1>Book Series</h1>

        <div className="series-row">
          {data.map((series) => (
            <SeriesImageCard
              key={series.id}
              title={series.title}
              imageBasePath={series.coverImage}
              onSelect={() => {
                console.log("selected book", series?.id);
                navigate(`/series/${seriesId}/${series.id}`);
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
