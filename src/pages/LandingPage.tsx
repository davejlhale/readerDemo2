import { Link } from "react-router-dom";
import "../styles/landing-page.css";

export function LandingPage() {
  return (
    <main className="page landing">
      <section className="landing-content">
        <h1>Welcome to Pathways Reader</h1>

        <p className="intro">
          Explore book series and stories designed to support early reading,
          curiosity, and confidence.
        </p>

        <Link to="/series" className="primary-action">
          Browse Book Series
        </Link>
      </section>
    </main>
  );
}
