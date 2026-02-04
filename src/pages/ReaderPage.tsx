import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData } from "../hooks/useBookData";
import "../styles/series-books.css";
import { TextControlsPanel } from "../components/TextControlsPanel";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";
import { TextControlsToggle } from "../components/buttons/TextControlsToggle";
import { useReaderSettings } from "../hooks/useReaderSettings";

export function ReaderPage() {
  const { seriesId, bookId, pageNumber } = useParams();
  const navigate = useNavigate();
  const readerSettings = useReaderSettings();

  const { data: book, error } = useBookData(seriesId, bookId);

  // ---- SAFE INITIAL PAGE (prevents negative hang) ----
  const parsedPage = Number(pageNumber);

  const initialPage =
    !pageNumber || isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = book?.pages.length ?? 0;
  const maxPage = totalPages; // remove +1 unless you truly need it

  const [showTextControls, setShowTextControls] = useState(false);

  const safePages = book
    ? book.pages.map((p) => ({
        page: Number(p.pageNumber),
        imageBaseURL: p.imageBaseURL,
      }))
    : [];

  const { loadedPages } = usePriorityPreloader(currentPage, safePages);

  // ---- PAGE VALIDATION ----
  useEffect(() => {
    if (!book) return;

    const parsed = Number(pageNumber);

    // If URL invalid → fix it
    if (!pageNumber || isNaN(parsed) || parsed < 1 || parsed > maxPage) {
      navigate(`/reader/${seriesId}/${bookId}/1`, {
        replace: true,
      });
      return;
    }

    // Only sync state if this is first load
    setCurrentPage((prev) => {
      // If state already changed via buttons, leave it alone
      if (prev !== parsed && prev === initialPage) {
        return parsed;
      }
      return prev;
    });
  }, [book, pageNumber, maxPage, navigate, seriesId, bookId]);

  // ---- ERROR NAVIGATION ----
  useEffect(() => {
    if (!error) return;

    if (error === "invalid-json" || error === "not-found") {
      navigate("/book-not-found", { replace: true });
    }

    if (error === "network-error") {
      navigate("/network-error", { replace: true });
    }
  }, [error, navigate]);

  if (error) {
    return <p>Error : {error}</p>;
  }

  if (!book) {
    return <p>Loading…</p>;
  }

  const page = book.pages[currentPage - 1];
  const isLoaded = loadedPages.has(currentPage);

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
                {currentPage <= totalPages && (
                  <>
                    <div className="book-image">
                      {/* SHOW TEXT CONTROLS OR IMAGE */}
                      {showTextControls ? (
                        <TextControlsPanel {...readerSettings} />
                      ) : (
                        <img
                          // style={{ maxHeight: "200px", display: "block" }}
                          src={
                            page.imageBaseURL ||
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
                        {page.lines.map((line, i) => (
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
