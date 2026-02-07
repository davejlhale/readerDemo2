type FadeProps = {
  onClick: () => void;
};

export function TopFade({ onClick }: FadeProps) {
  return (
    <button className="top-fade" onClick={onClick} aria-label="Scroll up">
      ☝
    </button>
  );
}

export function BottomFade({ onClick }: FadeProps) {
  return (
    <button className="bottom-fade" onClick={onClick} aria-label="Scroll Down">
      👇
    </button>
  );
}
