import { useEffect, useState } from "react";
import { getInitialSettings } from "../utility/getInitialSetting";
export type ReaderSettings = ReturnType<typeof useReaderSettings>;
const DEFAULT_SETTINGS = {
  fontSize: 1.4,
  wordSpacing: 0.2,
  lineHeight: 1.4,
  letterSpacing: 0,
  themeIndex: 0,
};

export function useReaderSettings() {
  const colourThemes = [
    // =====================================
    // Top Recommended (Low Contrast)
    // =====================================
    {
      name: "Default Theme",
      bg: "none",
      text: "black",
    },
    {
      name: "Antique White",
      bg: "#faebd7",
      text: "#1a1919",
    },
    {
      name: "Cream & Soft Black",
      bg: "#FAFAC8",
      text: "#161616",
    },
    {
      name: "Old Lace & Dark Grey",
      bg: "#FDF5E6",
      text: "#333333",
    },

    {
      name: "Soft Blue & Charcoal",
      bg: "#E7EEF6",
      text: "#424A52",
    },
    {
      name: "Pale Cyan & Deep Blue",
      bg: "#D1EAED",
      text: "#1B365D",
    },

    {
      name: "Light Green & Dark Green",
      bg: "#E7EFEC",
      text: "#006338",
    },
    {
      name: "Mint & Off Black",
      bg: "#E4FFE1",
      text: "#161616",
    },

    // =====================================
    // Soft Neutral Backgrounds
    // =====================================

    {
      name: "Warm Cream",
      bg: "#FEFDF5",
      text: "#424A52",
    },
    {
      name: "Light Grey",
      bg: "#D0D3D4",
      text: "#333333",
    },
    {
      name: "Gentle Blue",
      bg: "#A0D8EF",
      text: "#1B365D",
    },
    {
      name: "Soft Peach",
      bg: "#FFDAB9",
      text: "#333333",
    },
    {
      name: "Pale Yellow",
      bg: "#FFFFE5",
      text: "#424A52",
    },
  ];
  const resetSettings = () => {
    setFontSize(DEFAULT_SETTINGS.fontSize);
    setWordSpacing(DEFAULT_SETTINGS.wordSpacing);
    setLineHeight(DEFAULT_SETTINGS.lineHeight);
    setLetterSpacing(DEFAULT_SETTINGS.letterSpacing);
    setThemeIndex(DEFAULT_SETTINGS.themeIndex);
  };

  const initialSettings = getInitialSettings();
  // console.log("init settings", initialSettings);
  const [fontSize, setFontSize] = useState(initialSettings.fontSize);
  const [wordSpacing, setWordSpacing] = useState(initialSettings.wordSpacing);
  const [lineHeight, setLineHeight] = useState(initialSettings.lineHeight);
  const [letterSpacing, setLetterSpacing] = useState(
    initialSettings.letterSpacing,
  );

  const [themeIndex, setThemeIndex] = useState(initialSettings.themeIndex);
  const cycleTheme = () => {
    setThemeIndex((i: number) => (i + 1) % colourThemes.length);
  };
  const currentTheme = colourThemes[themeIndex];
  useEffect(() => {
    const root = document.documentElement;
    // console.log("themeIndex", themeIndex, typeof themeIndex);
    // console.log("themes length", colourThemes.length);

    root.style.setProperty("--font-size", `${fontSize}rem`);
    root.style.setProperty("--word-spacing", `${wordSpacing}em`);
    root.style.setProperty("--line-height", `${lineHeight}`);
    root.style.setProperty("--letter-spacing", `${letterSpacing}em`);
    root.style.setProperty("--reader-bg", currentTheme.bg);
    root.style.setProperty("--reader-text", currentTheme.text);
  }, [fontSize, wordSpacing, lineHeight, letterSpacing, themeIndex]);

  useEffect(() => {
    localStorage.setItem(
      "dho.reader-settings",
      JSON.stringify({
        fontSize,
        wordSpacing,
        lineHeight,
        letterSpacing,
        themeIndex,
      }),
    );
  }, [fontSize, wordSpacing, lineHeight, letterSpacing, themeIndex]);

  return {
    fontSize,
    setFontSize,
    wordSpacing,
    setWordSpacing,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
    themeIndex,
    setThemeIndex,
    currentTheme,
    cycleTheme,
    resetSettings,
  };
}
