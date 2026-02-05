import { AppErrorLayout } from "./AppErrorLayout";

export function BookNotFound({
  seriesId,
  bookId,
}: {
  seriesId?: string;
  bookId?: string;
}) {
  return (
    <AppErrorLayout title="Book Not Found">
      <p>
        Could not find the book <strong>{bookId}</strong>{" "}
      </p>
      <p>
        in the series <strong>{seriesId}</strong>.
      </p>
    </AppErrorLayout>
  );
}
