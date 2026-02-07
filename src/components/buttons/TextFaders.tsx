// type FadeProps = {
//   onClick: () => void;
// };
import { forwardRef } from "react";

export const TopFade = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  ({ onClick }, ref) => (
    <button
      className="top-fade"
      ref={ref}
      onClick={onClick}
      aria-label="Scroll up"
    >
      ☝
    </button>
  ),
);

export const BottomFade = forwardRef<
  HTMLButtonElement,
  { onClick: () => void }
>(({ onClick }, ref) => (
  <button
    className="bottom-fade"
    ref={ref}
    onClick={onClick}
    aria-label="Scroll Down"
  >
    👇
  </button>
));
