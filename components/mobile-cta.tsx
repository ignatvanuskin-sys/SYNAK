"use client";

import { company } from "@/lib/company-data";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui";

/**
 * FloatingMobileCTA — фиксированная нижняя панель только на мобильных.
 * Мобильное меню (z-50) и lightbox (z-[60]) перекрывают её по z-порядку,
 * поэтому панель никогда не показывается поверх них.
 * Страница получает нижний padding, чтобы панель не перекрывала контент.
 */
export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface px-4 py-3 lg:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:+${company.phone.raw}`}
          className="btn btn-primary flex-1"
          aria-label={`Позвонить: ${company.phone.display}`}
        >
          <PhoneIcon />
          <span>Позвонить</span>
        </a>
        <a
          href={company.links.whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary flex-1"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
