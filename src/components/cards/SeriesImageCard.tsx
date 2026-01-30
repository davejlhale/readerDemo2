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
      />
      <span>{title}</span>
    </button>
  );
}
