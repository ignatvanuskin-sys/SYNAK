import { useEffect, useState } from "react";

/**
 * Tracks scroll position and determines whether the header should use the
 * "light" (light background section underneath) or "dark" variant.
 *
 * Uses a single scroll listener + IntersectionObserver on sections with
 * `.bg-paper` or `.bg-copper` class — far cheaper than elementsFromPoint per frame.
 */
export function useHeaderTheme() {
  const [scrolled, setScrolled] = useState(false);
  const [headerLight, setHeaderLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Observe which section is near the top (under the fixed header)
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target;
            setHeaderLight(
              el.classList.contains("bg-paper") ||
                el.classList.contains("bg-copper"),
            );
          }
        }
      },
      { rootMargin: "-76px 0px -90% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return { scrolled, headerLight };
}
