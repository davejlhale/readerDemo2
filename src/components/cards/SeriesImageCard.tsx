type Props = {
  seriesId: string;
  title: string;
  imageBasePath: string;
  onSelect: () => void;
};

export function SeriesImageCard({
  seriesId,
  title,
  imageBasePath,
  onSelect,
}: Props) {
  console.log(`series card for series ${seriesId} and title ${title}`);

  return (
    <button className="series-card" onClick={onSelect}>
      <img
        src={`${imageBasePath}`}
        alt={title}
        loading="lazy"
        draggable={false}
        onError={(e) => {
          e.currentTarget.onerror = null; // prevent loop
          e.currentTarget.src = "/images/generic/books/coming-soon.webp";
        }}
      />
      <span>{title}</span>
    </button>
  );
}
