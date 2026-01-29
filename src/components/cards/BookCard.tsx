import { useState } from "react";

type BookCardProps = {
  title: string;
  seriesId: string;
  imageBasePath: string;
  onSelect: () => void;
  onPreload?: () => void;
  preloadState?: "idle" | "loading" | "done";
};

export function BookCard({
  title,
  seriesId,
  imageBasePath,
  onSelect,
  onPreload,
  preloadState = "idle",
}: BookCardProps) {
  const [hasImage, setHasImage] = useState(true);

  console.log(`book card for ${seriesId} and book ${title}`);

  const imageElement = (
    <img
      src={imageBasePath}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        setHasImage(false);
        e.currentTarget.src = "/images/generic/books/coming-soon.webp";
      }}
    />
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
