type Props = {
  title: string;
  imageBasePath: string;
  onSelect: () => void;
};

export function SeriesImageCard({ title, imageBasePath, onSelect }: Props) {
  console.log(title);
  return (
    <button className="series-card" onClick={onSelect}>
      <img
        src={`${imageBasePath}`}
        alt={title}
        loading="lazy"
        draggable={false}
      />
      {/* <span>{title}</span> */}
    </button>
  );
}
