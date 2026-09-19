import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { phone, phoneHref } from "@/lib/data";

interface HeaderProps {
  onBookingOpen: () => void;
}

const NAV_ITEMS: [string, string][] = [
  ["Услуги", "services"],
  ["Процесс", "process"],
  ["О сервисе", "trust"],
  ["Работы", "works"],
  ["Отзывы", "reviews"],
  ["Контакты", "contacts"],
];

export function Header({ onBookingOpen }: HeaderProps) {
  const { scrolled, headerLight } = useHeaderTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useBodyScrollLock(mobileOpen);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const openBooking = useCallback(() => {
    setMobileOpen(false);
    onBookingOpen();
  }, [onBookingOpen]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        headerLight
          ? "header-light border-b border-ink/10 text-ink shadow-sm backdrop-blur-xl"
          : scrolled
            ? "header-dark border-b border-white/10 backdrop-blur-xl"
            : "header-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3" aria-label="Сунақ — на главную">
          <span
            className={`site-wordmark font-display text-[15px] font-bold tracking-[0.22em] ${
              headerLight ? "text-ink" : "text-paper"
            }`}
          >
            СУНАҚ
          </span>
        </a>

        <nav
          className={`hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] xl:flex ${
            headerLight ? "text-ink/65" : "text-paper/65"
          }`}
        >
          {NAV_ITEMS.map(([label, id]) => (
            <a key={id} className="nav-link" href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <a
            href={phoneHref}
            className={`text-xs font-medium tracking-[0.08em] transition ${
              headerLight ? "text-ink/70 hover:text-ink" : "text-paper/70 hover:text-paper"
            }`}
          >
            {phone}
          </a>
          <button
            type="button"
            onClick={openBooking}
            className="button-dark group inline-flex items-center gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            Записаться
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          type="button"
          className={`site-menu-toggle grid h-11 w-11 place-items-center border xl:hidden ${
            headerLight ? "border-ink/15 text-ink" : "border-white/15 text-paper"
          }`}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="mobile-menu max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/10 px-5 py-6 text-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Разделы сайта и запись в Сунақ"
        >
          <nav className="flex flex-col gap-2 text-xs uppercase tracking-[0.18em] text-paper">
            {NAV_ITEMS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className="nav-link flex min-h-11 items-center"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={openBooking}
            className="menu-booking-trigger mt-5 flex min-h-12 w-full items-center justify-between border border-white/25 px-4 text-left text-xs font-bold uppercase tracking-[0.12em]"
          >
            <span>Записаться</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <a
            href={phoneHref}
            className="mt-3 flex min-h-12 w-full items-center justify-center gap-3 border border-white/25 text-xs font-semibold uppercase tracking-[0.12em]"
          >
            <Phone className="h-4 w-4 text-copper" /> Позвонить
          </a>
        </div>
      )}
    </header>
  );
}
