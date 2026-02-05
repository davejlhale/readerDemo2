import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SeriesIndexPage } from "./pages/SeriesIndexPage";
import { SeriesBooksPage } from "./pages/SeriesBooksPage";
// import { BookReadyPage } from "./pages/BookReadyPage";
import { ErrorPage } from "./pages/ErrorPage";
import { ReaderPage } from "./pages/ReaderPage";
import BookNotFound from "./pages/BookNotFound";
import { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundry";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<p>Loading…</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <LandingPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/series"
              element={
                <ErrorBoundary>
                  <SeriesIndexPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/series/:seriesId/:bookId/:pageNumber?/*"
              element={
                <ErrorBoundary>
                  <ReaderPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/series/:seriesId"
              element={
                <ErrorBoundary>
                  <SeriesBooksPage />
                </ErrorBoundary>
              }
            />

            <Route
              path="/reader/:seriesId/:bookId/:pageNumber?/*"
              element={
                <ErrorBoundary>
                  <ReaderPage />
                </ErrorBoundary>
              }
            />

            <Route path="/book-not-found" element={<BookNotFound />} />

            <Route path="/error" element={<ErrorPage />} />
            {/* 👇 Catch all unmatched routes */}
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
