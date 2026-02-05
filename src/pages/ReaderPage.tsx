import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData } from "../hooks/useBookData";
import "../styles/series-books.css";
import { TextControlsPanel } from "../components/TextControlsPanel";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";
import { TextControlsToggle } from "../components/buttons/TextControlsToggle";
import { useReaderSettings } from "../hooks/useReaderSettings";
import { LoadingBadge } from "../components/badges/LoadingBadge";

export function ReaderPage() {
  const { seriesId, bookId, pageNumber } = useParams();
  const readerSettings = useReaderSettings();
  const FALLBACK_IMAGE = "/images/generic/books/no-page-image-placeholder.webp";
  const ENDPAGE_IMAGE = "/images/generic/books/end-page--floral.webp";

  //gets books json file
  const { data: book, error } = useBookData(seriesId, bookId);

  const maxPage = useMemo(() => (book ? book.pages.length + 1 : 1), [book]);

  // ---- PAGE VALIDATION ----

  const parsed = Number(pageNumber);
  const currentPage = parsed >= 1 && parsed <= maxPage ? parsed : 1;

  const navigate = useNavigate();

  //book nav
  const goPrev = () =>
    navigate(`/reader/${seriesId}/${bookId}/${currentPage - 1}`);
  const goNext = () =>
    navigate(`/reader/${seriesId}/${bookId}/${currentPage + 1}`);

  const pageAssets = useMemo(
    () =>
      book?.pages.map((p) => ({
        page: p.pageNumber,
        imageBaseURL: p.imageBaseURL,
      })) ?? [],
    [book],
  );

  const { loadedPages } = usePriorityPreloader(currentPage, pageAssets);

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

  // -------- NO ERROR - RENDER PAGE  -------//
  if (!book) {
    return <p>Loading…</p>;
  }

  const page = book.pages[currentPage - 1];

  console.log(page);
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
                {/* CURRENT BOOK PAGE*/}
                {currentPage <= book.pages.length && (
                  <>
                    {/* PAGE IMAGE */}
                    <div className="book-image">
                      {/* SHOW TEXT CONTROLS OR IMAGE */}
                      {showTextControls ? (
                        <TextControlsPanel {...readerSettings} />
                      ) : (
                        <img
                          src={page?.imageBaseURL || FALLBACK_IMAGE}
                          alt={`Page ${currentPage}`}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      )}
                      {/* loading spinner for priorityloader*/}
                      {!isLoaded && <LoadingBadge />}
                    </div>
                    {/* BOOK TEXT*/}
                    <div className="book-text-wrapper">
                      <div className="book-text">
                        {page?.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* BOOK'S END PAGE */}
                {currentPage === maxPage && (
                  <>
                    <div className="book-image end-book-page">
                      <img
                        src={ENDPAGE_IMAGE}
                        alt="The End"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
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
            onClick={() => goPrev()}
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
            onClick={() => goNext()}
            disabled={currentPage >= maxPage}
            aria-label="Next page"
          ></button>
        </div>
      </div>
    </>
  );
}
