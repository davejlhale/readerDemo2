/**
 * NOTE ON FUTURE ARCHITECTURE
 * --------------------------------------------------
 * ReaderPage is intended to become the single, unified
 * reading engine for the entire app. In the long term,
 * this page will replace BookReadyPage entirely.
 *
 * Today, ReaderPage assumes that BookReadyPage has:
 *   • loaded the book JSON
 *   • preloaded the first 1–2 pages
 *   • ensured the reader can render immediately
 *
 * But once ReaderPage supports:
 *   • starting at any page (1 or last-read)
 *   • loading the starting page immediately
 *   • priority-based preloading:
 *        - startPage first
 *        - then forward (start+1 → end)
 *        - then backward (start-1 → 1)
 *   • showing placeholders until images arrive
 *   • tracking reading behaviour (time on page, etc.)
 *   • updating last-read progress in the database
 *
 * …then BookReadyPage becomes unnecessary.
 *
 * In that future design:
 *   - "Read" opens ReaderPage at page 1
 *   - "Continue Reading" opens ReaderPage at the user's last-read page
 *   - ReaderPage handles all loading, caching, and UX staging internally
 *   - No separate staging screen is required
 *
 * Keeping BookReadyPage for now is intentional:
 *   • It isolates preload logic while we refine it
 *   • It keeps ReaderPage simpler during early development
 *   • It allows us to debug loading behaviour without affecting the reader UI
 *
 * When the reader engine is mature, ReaderPage will absorb
 * all staging responsibilities and BookReadyPage can be removed.
 */
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

    if (!pageNumber || isNaN(parsed) || parsed < 1 || parsed > maxPage) {
      navigate(`/reader/${seriesId}/${bookId}/1`, {
        replace: true,
      });
      return;
    }

    // Keep state synced if URL changes
    if (parsed !== currentPage) {
      setCurrentPage(parsed);
    }
  }, [book, pageNumber, maxPage, navigate, seriesId, bookId, currentPage]);

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
                )}

                {/* PAGE TEXT */}
                {currentPage <= totalPages && (
                  <div className="book-text-wrapper">
                    <div className="book-text">
                      {page.lines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
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

      {/* =========================
          DEBUG / DEV OUTPUT
         ========================= */}
      {/* <div className="debug">
        <h1>{book.title}</h1>
        <p>Current page: {currentPage}</p>
        <p>Loaded pages: {Array.from(loadedPages).join(", ")}</p>
      </div> */}
    </>
  );
}
