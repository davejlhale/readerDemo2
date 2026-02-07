import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollableText(currentPage: number) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const topFadeRef = useRef<HTMLButtonElement | null>(null);
  const bottomFadeRef = useRef<HTMLButtonElement | null>(null);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  // --- Overflow + scroll position tracking ---
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const update = () => {
      const overflowing = el.scrollHeight > el.clientHeight;
      setIsOverflowing(overflowing);
      setAtTop(el.scrollTop === 0);
      setAtBottom(Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight);
    };

    update();
    el.addEventListener("scroll", update);

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [currentPage]);

  // --- Scroll helpers ---
  const getScrollAmount = () => {
    const el = textRef.current;
    return el ? Math.floor(el.clientHeight * 0.5) : 0;
  };

  const scrollByAmount = (amount: number) => {
    const el = textRef.current;
    if (!el) return;
    el.scrollBy({ top: amount, behavior: "smooth" });
  };

  const scrollUp = useCallback(() => {
    scrollByAmount(-getScrollAmount());
  }, []);

  const scrollDown = useCallback(() => {
    scrollByAmount(getScrollAmount());
  }, []);

  // --- Reset scroll on page change ---
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  // --- Keyboard navigation ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)
      ) {
        return;
      }
      if (!isOverflowing) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollDown();

        if (!atBottom && bottomFadeRef.current) {
          setTimeout(() => {
            topFadeRef.current?.blur();
            bottomFadeRef.current?.focus();
          }, 100);
        }
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollUp();

        if (!atTop && topFadeRef.current) {
          setTimeout(() => {
            bottomFadeRef.current?.blur();
            topFadeRef.current?.focus();
          }, 100);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOverflowing, scrollUp, scrollDown, atTop, atBottom]);

  return {
    textRef,
    topFadeRef,
    bottomFadeRef,
    isOverflowing,
    atTop,
    atBottom,
    scrollUp,
    scrollDown,
  };
}
