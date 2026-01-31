interface TextControlsToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

import "../../styles/TextControlsToggle.css";
export function TextControlsToggle({
  isOpen,
  onToggle,
}: TextControlsToggleProps) {
  return (
    <button
      className="text-controls-toggle scaler-cap"
      onClick={onToggle}
      aria-label="Toggle text settings"
      aria-expanded={isOpen}
      aria-controls="text-controls-panel"
    >
      <img src="/images/ui/access.webp" />
    </button>
  );
}
