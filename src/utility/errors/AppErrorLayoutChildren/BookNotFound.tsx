import { Link } from "react-router-dom";
import { AppErrorLayout } from "../AppErrorLayout";

export function BookNotFound({
  seriesId,
  bookId,
}: {
  seriesId?: string;
  bookId?: string;
}) {
  return (
    <AppErrorLayout
      title="Book Not Found"
      actions={
        <>
          <Link to={`/series/${seriesId}`}>
            <button>📔 Lets Find Another Book</button>
          </Link>

          <Link to="/">
            <button>🏠 Home</button>
          </Link>
        </>
      }
    >
      <p>
        Could not find the book <strong>{bookId}</strong>{" "}
      </p>
      <p>
        in the series <strong>{seriesId}</strong>.
      </p>
    </AppErrorLayout>
  );
}
