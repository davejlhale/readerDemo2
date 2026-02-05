import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData } from "../hooks/useBookData";
import "../styles/series-books.css";
import { TextControlsPanel } from "../components/TextControlsPanel";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";
import { TextControlsToggle } from "../components/buttons/TextControlsToggle";
import { useReaderSettings } from "../hooks/useReaderSettings";

export function ReaderPage() {
  const { seriesId, bookId, pageNumber } = useParams();
  const readerSettings = useReaderSettings();

  //gets books json file
  const { data: book, error } = useBookData(seriesId, bookId);

  const maxPage = useMemo(() => (book ? book.pages.length + 1 : 1), [book]);

  //default to page 1,
  // let paramater verification in useffect change staring page
  //after book json loads
  const [currentPage, setCurrentPage] = useState(1);

  // ---- PAGE VALIDATION ----
  useEffect(() => {
    if (!book) return;
    const parsed = Number(pageNumber);
    const safePage = parsed >= 1 && parsed <= maxPage ? parsed : 1;
    setCurrentPage(safePage);
  }, [book, pageNumber, maxPage]);

  const safePages = useMemo(() => {
    if (!book) return [];
    return book.pages.map((p) => ({
      page: p.pageNumber,
      imageBaseURL: p.imageBaseURL,
    }));
  }, [book]);

  const { loadedPages } = usePriorityPreloader(currentPage, safePages);

  /* ===============
   used in conditional renders
   ================== */

  const isLoaded = loadedPages.has(currentPage);
  const [showTextControls, setShowTextControls] = useState(false);
  // ---- ERROR NAVIGATION ----

  if (error === "invalid-json" || error === "not-found") {
    return <Navigate to="/book-not-found" replace />;
  }

  if (error === "network-error") {
    return <Navigate to="/network-error" replace />;
  }

  if (error) {
    return <p>Error : {error}</p>;
  }

  // -------- NO ERROR SO RENDER PAGE -------//
  if (!book) {
    return <p>Loading…</p>;
  }

  const isStoryPage = currentPage <= book.pages.length;
  const page = isStoryPage ? book.pages[currentPage - 1] : null;

  console.log(book);
  return (
    <>
      <div className="book-page">
        {/* =========================
          READER CONTENT
         ========================= */}
        <div
          className={`book-wrapper ${currentPage % 2 === 0 ? "even-page" : "odd-page"}`}
        >
          <div className="page-top">
            <div className="page-content">
              <div className="stretch">
                {/* PAGE IMAGE */}
                {currentPage <= book.pages.length && (
                  <>
                    <div className="book-image">
                      {/* SHOW TEXT CONTROLS OR IMAGE */}
                      {showTextControls ? (
                        <TextControlsPanel {...readerSettings} />
                      ) : (
                        <img
                          src={
                            page?.imageBaseURL ||
                            "/images/generic/books/no-page-image-placeholder.webp"
                          }
                          alt={`Page ${currentPage}`}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/generic/books/no-page-image-placeholder.webp";
                          }}
                        />
                      )}

                      {/* loading spinner for priorityloader*/}
                      {!isLoaded && (
                        <div
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: "rgba(0,0,0,0.4)",
                            color: "white",
                            padding: "4px 6px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                          }}
                        >
                          Loading…
                        </div>
                      )}
                    </div>

                    <div className="book-text-wrapper">
                      <div className="book-text">
                        {page?.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* END PAGE */}
                {currentPage === maxPage && (
                  <>
                    <div className="book-image end-book-page">
                      <img
                        src="/images/generic/books/end-page--floral.webp"
                        alt="The End"
                      />
                    </div>
                    <div className="book-text-wrapper">
                      <div className="book-text"></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================
          NAV / CONTROL BAR
         ========================= */}

        <div className="book-navigation">
          <button
            className="book-page-nav-button prev scaler-cap "
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          ></button>
          <div className="book-nav-control-block">
            <TextControlsToggle
              isOpen={showTextControls}
              onToggle={() => setShowTextControls((s) => !s)}
            />
            <NavigateBackButton fallbackRoute={`/series/${seriesId}`} />
          </div>
          <button
            className="book-page-nav-button next scaler-cap"
            onClick={() => setCurrentPage((p) => Math.min(maxPage, p + 1))}
            disabled={currentPage >= maxPage}
            aria-label="Next page"
          ></button>
        </div>
      </div>
    </>
  );
}
