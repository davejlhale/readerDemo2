import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SeriesIndexPage } from "./pages/SeriesIndexPage";
import { SeriesBooksPage } from "./pages/SeriesBooksPage";
// import { BookReadyPage } from "./pages/BookReadyPage";
import { ErrorPage } from "./pages/ErrorPage";
import { ReaderPage } from "./pages/ReaderPage";
import BookNotFound from "./pages/BookNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/series" element={<SeriesIndexPage />} />
          <Route path="/series/:seriesId" element={<SeriesBooksPage />} />

          <Route
            path="/reader/:seriesId/:bookId/:pageNumber?/*"
            element={<ReaderPage />}
          />
          <Route path="/book-not-found" element={<BookNotFound />} />

          <Route path="/error" element={<ErrorPage />} />
          {/* 👇 Catch all unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
