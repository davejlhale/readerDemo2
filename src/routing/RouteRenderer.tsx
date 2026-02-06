// RouteRenderer.tsx
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundry";
import type { ComponentType } from "react";

import { LandingPage } from "../pages/LandingPage";
import { SeriesIndexPage } from "../pages/SeriesIndexPage";
import { SeriesBooksPage } from "../pages/SeriesBooksPage";
import { ReaderPage } from "../pages/ReaderPage";
import BookNotFound from "../pages/BookNotFound";
import { ErrorPage } from "../pages/ErrorPage";
import { ThrowPageNotFound } from "../utility/errors/AppErrorLayoutChildren/ThrowPageNotFound";

interface AppRoute {
  path: string;
  element: ComponentType;
}

const routes: AppRoute[] = [
  { path: "/", element: LandingPage },

  // READER — static first
  { path: "/reader", element: SeriesIndexPage },
  { path: "/reader/:seriesId", element: SeriesBooksPage },
  { path: "/reader/:seriesId/:bookId/:pageNumber?", element: ReaderPage },

  // SERIES — static first
  { path: "/series", element: SeriesIndexPage },
  { path: "/series/:seriesId", element: SeriesBooksPage },
  { path: "/series/:seriesId/:bookId/:pageNumber?", element: ReaderPage },

  { path: "/book-not-found", element: BookNotFound },
  { path: "/error", element: ErrorPage },
  { path: "*", element: ThrowPageNotFound },
];

import { useLocation } from "react-router-dom";

export function RouteRenderer() {
  const location = useLocation();

  return (
    <Routes location={location}>
      {routes.map(({ path, element: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ErrorBoundary key={path}>
              <Component />
            </ErrorBoundary>
          }
        />
      ))}
    </Routes>
  );
}
