import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SeriesIndexPage } from "./pages/SeriesIndexPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/series" element={<SeriesIndexPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
