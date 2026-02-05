import { useNavigate, useLocation } from "react-router-dom";
import { useSeriesIndex, type SeriesMeta } from "../hooks/useSeriesIndex";
import { SeriesImageCard } from "../components/cards/SeriesImageCard";
import "../styles/series-index.css";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";

export function SeriesIndexPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const series = useSeriesIndex();

  return (
    <main className="series-index-wrapper">
      <section className="series-list">
        <div className="series-list-header">
          <h1>Book Series</h1> <NavigateBackButton fallbackRoute="/" />
        </div>
        <div className="series-row-wrapper">
          <div className="series-row">
            {series.map((series: SeriesMeta) => (
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
