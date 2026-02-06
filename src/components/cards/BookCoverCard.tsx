import { useState } from "react";
import type { Band } from "../../_CONSTANTS/constants";

type BookCardProps = {
  title: string;
  seriesId: string;
  imageBasePath: string;
  band: string;
  onSelect: () => void;
  onPreload?: () => void;
  preloadState?: "idle" | "loading" | "done";
};

export function BookCoverCard({
  title,
  seriesId,
  imageBasePath,
  band,
  onSelect,
  onPreload,
  preloadState = "idle",
}: BookCardProps) {
  const [hasImage, setHasImage] = useState(true);
  const VALID_BANDS: Band[] = [
    "Pink",
    "Red",
    "Yellow",
    "Blue",
    "Green",
    "Orange",
    "Turquoise",
    "Purple",
    "Gold",
    "White",
  ];

  const showBand = VALID_BANDS.includes(band as Band);
  // console.log(`book card for ${seriesId} and book ${title}`);
  seriesId = seriesId;
  const imageElement = (
    <div className="book-card-image-wrapper">
      <img
        src={imageBasePath}
        alt={title}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          setHasImage(false);
          e.currentTarget.onerror = null; // prevent loop
          e.currentTarget.src = "/images/generic/books/coming-soon.webp";
        }}
      />
      {showBand && (
        <div
          className="book-band-badge"
          style={{ border: "2px solid " + band }}
        >
          <div
            className="book-band-star"
            style={{ backgroundColor: band }}
            aria-label={`Band: ${band}`}
            title={`Band: ${band}`}
          />
        </div>
      )}
    </div>
  );

  // 🟢 IMAGE EXISTS → BUTTON
  if (hasImage) {
    return (
      <button className="series-card" onClick={onSelect}>
        {imageElement}

        {onPreload && (
          <div className="action-bar">
            <span className="read-pill">Read</span>

            <span
              className="icon-pill"
              onClick={(e) => {
                e.stopPropagation();
                onPreload();
              }}
            >
              <span>
                {preloadState === "idle" && "⬇️"}
                {preloadState === "loading" && "⏳"}
                {preloadState === "done" && "✔️"}
              </span>
            </span>
          </div>
        )}
      </button>
    );
  }

  // 🔵 NO IMAGE → PLAIN DIV WITH TITLE
  return (
    <div className="series-card book-card-no-image">
      {imageElement}
      <div className="no-image-inner">
        <div className="banner-text">{title}</div>
      </div>
    </div>
  );
}
