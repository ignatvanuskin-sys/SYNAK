"use client";

import { useEffect, useRef } from "react";
import { company, navItems } from "@/lib/company-data";
import { WhatsAppLink, WhatsAppIcon, RouteLink } from "@/components/ui";

/**
 * MobileMenu — off-canvas меню.
 * Закрытие: кнопка, Escape, выбор пункта.
 * Блокирует фоновый scroll, поддерживает клавиатуру.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Блокировка фонового скролла
    const scrollY = window.scrollY;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;

    // Escape закрывает меню
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Начальный фокус на кнопку закрытия
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
      {/* Затемнение — клик закрывает */}
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/50"
      />

      {/* Панель */}
      <div
        ref={panelRef}
        className="fade-up absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-heading text-[20px] font-extrabold text-ink">Сунақ</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="inline-flex h-12 w-12 items-center justify-center rounded-btn text-ink"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Мобильная навигация" className="flex-1 px-5 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-card px-3 py-3 text-[17px] font-medium text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line px-5 py-5">
          <a
            href={`tel:+${company.phone.raw}`}
            className="block text-[19px] font-bold text-ink"
          >
            {company.phone.display}
          </a>
          <WhatsAppLink className="btn btn-primary w-full" />
          <RouteLink className="btn btn-secondary w-full" />
          <p className="pt-1 text-[13px] leading-relaxed text-ink-soft">
            {company.address.locality}, {company.address.full}
            <br />
            {company.hours.withSource}
          </p>
        </div>
      </div>
    </div>
  );
}
