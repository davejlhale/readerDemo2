import { Link } from "react-router-dom";
import { AppErrorLayout } from "../AppErrorLayout";

export function SeriesIndexMissing({ seriesId }: { seriesId?: string }) {
  return (
    <AppErrorLayout
      title="Series Not Found"
      actions={
        <>
          <Link to={`/series`}>
            <button>📚 Lets Find Another Series</button>
          </Link>

          <Link to="/">
            <button>🏠 Home</button>
          </Link>
        </>
      }
    >
      <p>Could not find any books in the series </p>
      <p>
        <strong>{seriesId}</strong>.
      </p>
    </AppErrorLayout>
  );
}
