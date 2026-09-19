import { useEffect } from "react";

/**
 * Adds `.is-visible` class to `.scroll-reveal` elements when they enter the viewport.
 * Uses IntersectionObserver — much cheaper than elementsFromPoint on every scroll.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
