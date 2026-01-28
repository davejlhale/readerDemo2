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
  console.log(`book card for ${seriesId} and book ${title}`);
  return (
    <button className="series-card" onClick={onSelect}>
      <img src={imageBasePath} alt={title} loading="lazy" decoding="async" />

      {onPreload && (
        <div
          className="preload-icon-overlay"
          onClick={(e) => {
            e.stopPropagation();
            onPreload();
          }}
        >
          {preloadState === "idle" && <span>⬇️</span>}
          {preloadState === "loading" && <span>⏳</span>}
          {preloadState === "done" && <span>✔️</span>}
        </div>
      )}
    </button>
  );
}
