import { AppErrorLayout } from "./AppErrorLayout";

export function NetworkError() {
  return (
    <AppErrorLayout title="Network Error">
      <p>Please check your connection and try again.</p>
    </AppErrorLayout>
  );
}
