type Props = {
  title: string;
  imageBasePath: string;
  onSelect: () => void;
};

export function SeriesImageCard({ title, imageBasePath, onSelect }: Props) {
  return (
    <button className="series-card" onClick={onSelect}>
      <img
        src={`${imageBasePath}.png`}
        alt=""
        loading="lazy"
        draggable={false}
      />
      <span>{title}</span>
    </button>
  );
}
