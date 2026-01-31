import { useEffect, useState } from "react";
import "../styles/BookTextControlPanel.css";
import { ScalerControls } from "./ScalerControls";

export function BookTextControlPanel() {
  const [fontSize, setFontSize] = useState(1.4);
  const [wordSpacing, setWordSpacing] = useState(0.1);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [letterSpacing, setLetterSpacing] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--font-size", `${fontSize}rem`);
    root.style.setProperty("--letter-spacing", `${letterSpacing}em`);
    root.style.setProperty("--line-height", `${lineHeight}`);
    root.style.setProperty("--word-spacing", `${wordSpacing}em`);
  }, [fontSize, letterSpacing, lineHeight, wordSpacing]);

  return (
    <div className="text-panel-controls scaler-cap">
      <div>
        <ScalerControls
          labelMinus="LH−"
          labelPlus="LH+"
          setter={setLineHeight}
          min={1}
          max={3}
          step={0.1}
          className="font-size-controls"
        />
        <ScalerControls
          labelMinus="LS−"
          labelPlus="LS+"
          setter={setLetterSpacing}
          min={0}
          max={0.5}
          step={0.02}
          className="font-size-controls"
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
          className="font-size-controls"
        />

        <ScalerControls
          labelMinus="WS−"
          labelPlus="WS+"
          setter={setWordSpacing}
          min={0}
          max={5}
          step={0.05}
          className="word-spacing-controls"
        />
      </div>
    </div>
  );
}
