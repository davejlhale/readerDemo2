import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePriorityPreloader } from "../hooks/usePriorityPreloader";
import { useBookData, type PageData } from "../hooks/useBookData";
import "../styles/series-books.css";
import { TextControlsPanel } from "../components/TextControlsPanel";
import { NavigateBackButton } from "../components/buttons/NavigateBackButton";
import { TextControlsToggle } from "../components/buttons/TextControlsToggle";
import { useReaderSettings } from "../hooks/useReaderSettings";
import { LoadingBadge } from "../components/badges/LoadingBadge";
import { TopFade, BottomFade } from "../components/buttons/TextFaders";
import { IMAGE_PATHS } from "../_CONSTANTS/constants";
import { useScrollableText } from "../hooks/useScrollableText";

export function ReaderPage() {
  const navigate = useNavigate();

  const { seriesId, bookId, pageNumber } = useParams();
  const readerSettings = useReaderSettings();
  const [showTextControls, setShowTextControls] = useState(false);
  const book = useBookData(seriesId, bookId);

  /*=======
  replacing url with in range page number
  ==========*/
  const maxPage = book ? book.pages.length + 1 : 1;
  const parsed = Number(pageNumber);
  const currentPage = parsed >= 1 && parsed <= maxPage ? parsed : 1;
  useEffect(() => {
    if (parsed !== currentPage) {
      navigate(`/reader/${seriesId}/${bookId}/${currentPage}`, {
        replace: true,
      });
    }
  }, [currentPage, seriesId, bookId, navigate]);

  /* ========
get an array of image urls per page
and preload them
===========*/
  const pageAssets = book
    ? book.pages.map((p: PageData) => ({
        page: p.pageNumber,
        imageBaseURL: p.imageBaseURL,
      }))
    : [];

  const { loadedPages } = usePriorityPreloader(currentPage, pageAssets);

  const isLoaded = loadedPages.has(currentPage);
  const page = book?.pages[currentPage - 1];

  const {
    textRef,
    topFadeRef,
    bottomFadeRef,
    isOverflowing,
    atTop,
    atBottom,
    scrollUp,
    scrollDown,
  } = useScrollableText(currentPage);

  if (!book) {
    return (
      <div className="book-page">
        <LoadingBadge />
      </div>
    );
  }

  // -------- RENDER PAGE  -------//
  return (
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
                      <TextControlsPanel
                        {...readerSettings}
                        onClose={() => setShowTextControls(false)}
                      />
                    ) : (
                      <img
                        src={
                          page?.imageBaseURL || IMAGE_PATHS.NO_IMAGE_FALLBACK
                        }
                        alt={`Page ${currentPage}`}
                        onError={(e) => {
                          e.currentTarget.src = IMAGE_PATHS.NO_IMAGE_FALLBACK;
                        }}
                      />
                    )}
                    {/* loading spinner for priorityloader*/}
                    {!isLoaded && <LoadingBadge />}
                  </div>
                  {/* BOOK TEXT*/}
                  <div className="book-text-wrapper">
                    <div
                      className="book-text"
                      ref={textRef}
                      role="region"
                      aria-label="Book text"
                      tabIndex={-1}
                    >
                      {page?.lines.map((line: String, i: number) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    {isOverflowing && !atTop && (
                      <TopFade ref={topFadeRef} onClick={scrollUp} />
                    )}
                    {isOverflowing && !atBottom && (
                      <BottomFade ref={bottomFadeRef} onClick={scrollDown} />
                    )}
                  </div>
                </>
              )}

              {/* BOOK'S END PAGE */}
              {currentPage === maxPage && (
                <>
                  <div className="book-image end-book-page">
                    <img
                      src={IMAGE_PATHS.END_PAGE}
                      alt="The End"
                      onError={(e) => {
                        e.currentTarget.src = IMAGE_PATHS.NO_IMAGE_FALLBACK;
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
          onClick={() =>
            navigate(`/reader/${seriesId}/${bookId}/${currentPage - 1}`)
          }
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
          onClick={() =>
            navigate(`/reader/${seriesId}/${bookId}/${currentPage + 1}`)
          }
          disabled={currentPage >= maxPage}
          aria-label="Next page"
        ></button>
      </div>
    </div>
  );
}
