type BookTileProps = {
  title: string;
  imageBasePath: string;
  onSelect: () => void;
};

export function BookCoverCard({
  title,
  imageBasePath,
  onSelect,
}: BookTileProps) {
  return (
    <button className="tile" onClick={onSelect}>
      <div className="tile-image">
        <img
          src={`${imageBasePath}.png`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="tile-title">{title}</div>
    </button>
  );
}
