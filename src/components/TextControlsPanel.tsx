import "../styles/TextControlsPanel.css";
import { ScalerControls } from "./ScalerControls";
import type { ReaderSettings } from "../hooks/useReaderSettings";

export function TextControlsPanel(
  props: ReaderSettings & { onClose: () => void },
) {
  const {
    setFontSize,
    setWordSpacing,
    setLineHeight,
    setLetterSpacing,
    currentTheme,
    cycleTheme,
    resetSettings,
    onClose,
  } = props;

  return (
    <div className="text-controls-panel scaler-cap">
      <button
        className="panel-close-button"
        onClick={onClose}
        aria-label="Close text settings panel"
      >
        ✕
      </button>
      <div>
        <ScalerControls
          labelMinus="LH−"
          labelPlus="LH+"
          setter={setLineHeight}
          min={1}
          max={5}
          step={0.1}
          className="font-size-controls scaler-pair"
        />
        <ScalerControls
          labelMinus="LS−"
          labelPlus="LS+"
          setter={setLetterSpacing}
          min={0}
          max={0.5}
          step={0.02}
          className="font-size-controls scaler-pair"
        />
      </div>
      <div>
        <ScalerControls
          labelMinus="A−"
          labelPlus="A+"
          setter={setFontSize}
          min={0.8}
          max={6}
          step={0.1}
          className="font-size-controls scaler-pair"
        />

        <ScalerControls
          labelMinus="WS−"
          labelPlus="WS+"
          setter={setWordSpacing}
          min={0}
          max={5}
          step={0.05}
          className="word-spacing-controls scaler-pair"
        />
      </div>
      <div>
        <button
          className="colour-hanger scaler-cap"
          onClick={cycleTheme}
          aria-label="Change colour theme"
        >
          {currentTheme.name}
        </button>

        <button
          className="reset-button scaler-cap"
          onClick={resetSettings}
          aria-label="Reset text settings to default"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
