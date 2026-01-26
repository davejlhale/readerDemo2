import { useLocation, useNavigate } from "react-router-dom";

type ErrorState = {
  seriesId?: string;
  bookId?: string;
  message?: string;
  source?: string;
};

export function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ErrorState | null;

  const seriesId = state?.seriesId;
  const message = state?.message ?? "Unknown error.";
  const source = state?.source ?? "Unknown source.";

  // Developer log
  console.error("error page data:", {
    seriesId,
    message,
    source,
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Something went wrong</h1>

      <p>
        <strong>Where:</strong> {source}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/series")}>
          Back to Series Selection
        </button>

        {seriesId && (
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => navigate(`/series/${seriesId}`)}
          >
            Back to This Series
          </button>
        )}
      </div>
    </main>
  );
}
