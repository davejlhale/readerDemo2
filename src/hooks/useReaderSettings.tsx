import { useEffect, useState } from "react";
import { getInitialSettings } from "../utility/getInitialSetting";
export type ReaderSettings = ReturnType<typeof useReaderSettings>;

export function useReaderSettings() {
  //   const [fontSize, setFontSize] = useState(1.4);
  //   const [wordSpacing, setWordSpacing] = useState(0.2);
  //   const [lineHeight, setLineHeight] = useState(1.4);
  //   const [letterSpacing, setLetterSpacing] = useState(0);

  // Apply to CSS variables

  const initialSettings = getInitialSettings();
  console.log("init settings", initialSettings);
  const [fontSize, setFontSize] = useState(initialSettings.fontSize);
  const [wordSpacing, setWordSpacing] = useState(initialSettings.wordSpacing);
  const [lineHeight, setLineHeight] = useState(initialSettings.lineHeight);
  const [letterSpacing, setLetterSpacing] = useState(
    initialSettings.letterSpacing,
  );
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--font-size", `${fontSize}rem`);
    root.style.setProperty("--word-spacing", `${wordSpacing}em`);
    root.style.setProperty("--line-height", `${lineHeight}`);
    root.style.setProperty("--letter-spacing", `${letterSpacing}em`);
  }, [fontSize, wordSpacing, lineHeight, letterSpacing]);

  useEffect(() => {
    localStorage.setItem(
      "dho.reader-settings",
      JSON.stringify({ fontSize, wordSpacing, lineHeight, letterSpacing }),
    );
  }, [fontSize, wordSpacing, lineHeight, letterSpacing]);

  return {
    fontSize,
    setFontSize,
    wordSpacing,
    setWordSpacing,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
  };
}
