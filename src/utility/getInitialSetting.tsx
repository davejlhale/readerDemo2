export const getInitialSettings = () => {
  if (typeof window === "undefined") {
    return {
      fontSize: 1.4,
      wordSpacing: 0.2,
      lineHeight: 1.4,
      letterSpacing: 0,
    };
  }

  const stored = localStorage.getItem("dho.reader-settings");

  return stored
    ? JSON.parse(stored)
    : {
        fontSize: 1.4,
        wordSpacing: 0.2,
        lineHeight: 1.4,
        letterSpacing: 0,
      };
};
