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
import { useNavigate, useLocation } from "react-router-dom";
import { useSeriesIndex } from "../hooks/useSeriesIndex";
import { SeriesImageCard } from "../components/cards/SeriesImageCard";
import "../styles/series-index.css";

export function SeriesIndexPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useSeriesIndex();
  const location = useLocation();

  if (loading) return <p>Loading…</p>;
  if (error || !data) return <p>Failed to load series.</p>;

  return (
    <main className="series-index-wrapper">
      <section className="series-list">
        <h1>Book Series</h1>
        <div className="series-row-wrapper">
          <div className="series-row">
            {data.map((series) => (
              <SeriesImageCard
                key={series.id}
                seriesId={series.id}
                title={series.title}
                imageBasePath={series.cardImage}
                onSelect={() =>
                  navigate(`/series/${series.id}`, {
                    state: { from: location.pathname },
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
