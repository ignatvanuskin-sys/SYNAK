"use client";

import { useEffect, useState } from "react";
import { company, navItems } from "@/lib/company-data";
import { PhoneLink, PhoneIcon } from "@/components/ui";
import { MobileMenu } from "@/components/mobile-menu";

/** StickyHeader — компактный, sticky, без переполнения */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-[72px]">
        {/* Wordmark */}
        <a
          href="#top"
          className="flex shrink-0 flex-col leading-none"
          aria-label="Сунақ — на главную"
        >
          <span className="font-heading text-[21px] font-extrabold tracking-tight text-ink md:text-[23px]">
            Сунақ
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-ink-soft md:text-[12px]">
            СТО в Астане
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop phone + CTA */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a
            href={`tel:+${company.phone.raw}`}
            className="hidden text-[15px] font-semibold text-ink transition-colors hover:text-accent-text xl:block"
          >
            {company.phone.display}
          </a>
          <PhoneLink className="btn btn-primary px-4 text-[15px]" />
        </div>

        {/* Mobile actions: call + menu */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <PhoneLink
            className="inline-flex h-12 w-12 items-center justify-center rounded-btn text-accent"
            aria-label={`Позвонить: ${company.phone.display}`}
          >
            <PhoneIcon className="h-[22px] w-[22px]" />
          </PhoneLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Открыть меню"
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
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
