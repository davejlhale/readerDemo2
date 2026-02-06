import { BrowserRouter } from "react-router-dom";

import { Suspense } from "react";
import { RouteRenderer } from "./routing/RouteRenderer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<p>Loading…</p>}>
          <RouteRenderer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
