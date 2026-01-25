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
import { useNavigate } from "react-router-dom";
import { useSeriesIndex } from "../hooks/useSeriesIndex";
import { SeriesImageCard } from "../components/cards/SeriesImageCard";
import "../styles/series-index.css";

export function SeriesIndexPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useSeriesIndex();

  if (loading) return <p>Loading…</p>;
  if (error || !data) return <p>Failed to load series.</p>;

  return (
    <main className="series-index-page">
      <section className="series-list">
        <h1>Book Series</h1>
        {/* <div className="series-row">
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
          <p className="series-card">g</p>
        </div> */}
        <div className="series-row">
          {data.map((series) => (
            <SeriesImageCard
              key={series.id}
              title={series.title}
              imageBasePath={series.cardImage}
              onSelect={() => navigate(`/series/${series.id}`)}
            />
          ))}
          {data.map((series) => (
            <SeriesImageCard
              key={series.id}
              title={series.title}
              imageBasePath={series.cardImage}
              onSelect={() => navigate(`/series/${series.id}`)}
            />
          ))}{" "}
          {data.map((series) => (
            <SeriesImageCard
              key={series.id}
              title={series.title}
              imageBasePath={series.cardImage}
              onSelect={() => navigate(`/series/${series.id}`)}
            />
          ))}{" "}
          {data.map((series) => (
            <SeriesImageCard
              key={series.id}
              title={series.title}
              imageBasePath={series.cardImage}
              onSelect={() => navigate(`/series/${series.id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
