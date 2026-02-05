import { AppErrorLayout } from "./AppErrorLayout";

export function SeriesIndexMissing({ seriesId }: { seriesId?: string }) {
  return (
    <AppErrorLayout title="Series Not Found">
      <p>Could not find any books in the series </p>
      <p>
        <strong>{seriesId}</strong>.
      </p>
    </AppErrorLayout>
  );
}
