import { useEffect, useState } from "react";
import "../styles/BookTextControlPanel.css";

interface FontSizeControlsProps {
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}
interface WordSpacingControlsProps {
  setWordSpacing: React.Dispatch<React.SetStateAction<number>>;
}

export function WordSpacingControls({
  setWordSpacing,
}: WordSpacingControlsProps) {
  const decrease = () => setWordSpacing((w) => Math.max(0, w - 0.05));
  const increase = () => setWordSpacing((w) => Math.min(5, w + 0.05));

  return (
    <div className="word-spacing-controls">
      <button onClick={decrease}>WS−</button>
      <button onClick={increase}>WS+</button>
    </div>
  );
}

export function FontSizeControls({ setFontSize }: FontSizeControlsProps) {
  const decrease = () => setFontSize((f) => Math.max(0.8, f - 0.1));
  const increase = () => setFontSize((f) => Math.min(6, f + 0.1));

  return (
    <div className="font-size-controls">
      <button onClick={decrease}>A−</button>
      <button onClick={increase}>A+</button>
    </div>
  );
}

export function BookTextControlPanel() {
  const [fontSize, setFontSize] = useState(1.4);
  const [wordSpacing, setWordSpacing] = useState(0.1);

  /* -----------------------------------------
     CSS variable side effects (OWNED HERE)
  ----------------------------------------- */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      `${fontSize}rem`,
    );
    console.log("trigger", fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-word-spacing",
      `${wordSpacing}em`,
    );
  }, [wordSpacing]);

  return (
    <div className="text-panel-controls">
      <FontSizeControls setFontSize={setFontSize} />
      <WordSpacingControls setWordSpacing={setWordSpacing} />
    </div>
  );
}
