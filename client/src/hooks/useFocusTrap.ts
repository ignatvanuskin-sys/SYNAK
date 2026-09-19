import { useEffect, type RefObject } from "react";

/**
 * Traps focus inside a container while `active` is true.
 * Tab and Shift+Tab cycle within the container.
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    );

    // Focus first element
    const first = focusable[0];
    if (first) first.focus();

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    container.addEventListener("keydown", onKeydown);
    return () => container.removeEventListener("keydown", onKeydown);
  }, [containerRef, active]);
}
