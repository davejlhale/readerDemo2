import { Link } from "react-router-dom";
import "../styles/landing-page.css";

import { useEffect, useState } from "react";
export function LandingPage() {
  return (
    <main className="page landing">
      <section className="landing-content">
        <h1>Welcome to Pathways Reader</h1>

        <p className="intro">
          Explore book series and stories designed to support early reading,
          curiosity, and confidence.
        </p>
        <div className="flex-col">
          <Link to="/series" className="primary-action">
            Browse Book Series
          </Link>
          <InstallButton />
        </div>
      </section>
    </main>
  );
}

export default function InstallButton() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  if (!prompt) return null;

  return (
    <button className="primary-action" onClick={install}>
      Install App
    </button>
  );
}
