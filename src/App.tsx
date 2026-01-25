import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SeriesIndexPage } from "./pages/SeriesIndexPage";
import { SeriesBooksPage } from "./pages/SeriesBooksPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/series" element={<SeriesIndexPage />} />
          <Route path="/series/:seriesId" element={<SeriesBooksPage />} />
          <Route path="/series/:seriesId/book/:bookId" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
