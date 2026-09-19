import { useEffect } from "react";

/**
 * Locks body scroll when `locked` is true.
 * Restores previous overflow on cleanup.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
