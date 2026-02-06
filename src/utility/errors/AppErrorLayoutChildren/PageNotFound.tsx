import { Link } from "react-router-dom";
import { AppErrorLayout } from "../AppErrorLayout";

export function PageNotFound() {
  return (
    <AppErrorLayout
      title="Page Not Found"
      actions={
        <Link to="/">
          <button>🏠 Home</button>
        </Link>
      }
    >
      <p>The page you are looking for does not exist.</p>
    </AppErrorLayout>
  );
}
