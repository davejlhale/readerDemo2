import { Link } from "react-router-dom";
import { AppErrorLayout } from "../AppErrorLayout";

export function NetworkError() {
  return (
    <AppErrorLayout
      title="Network Error"
      actions={
        <Link to="/">
          <button>🏠 Home</button>
        </Link>
      }
    >
      <p>Please check your connection and try again.</p>
    </AppErrorLayout>
  );
}
