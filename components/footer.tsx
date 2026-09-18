import { company } from "@/lib/company-data";
import { WhatsAppIcon } from "@/components/ui";

/** Footer — компактный, без пустых иконок соцсетей */
export function Footer() {
  return (
    <footer className="border-t border-line bg-card pb-28 lg:pb-0">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-heading text-[22px] font-extrabold tracking-tight text-ink">
              Сунақ
            </p>
            <p className="mt-0.5 text-[13px] text-ink-soft">СТО в Астане</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Легковой автосервис в Астане
            </p>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              {company.address.locality}, {company.address.full}
              <br />
              {company.hours.short} по данным 2ГИС
            </p>
          </div>

          <nav aria-label="Контакты в подвале" className="space-y-3">
            <p>
              <a
                href={`tel:+${company.phone.raw}`}
                className="text-[17px] font-bold text-ink transition-colors hover:text-accent-text"
              >
                {company.phone.display}
              </a>
            </p>
            <p>
              <a
                href={company.links.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-soft transition-colors hover:text-accent-text"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </p>
            <p>
              <a
                href={company.links.card}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-ink-soft transition-colors hover:text-accent-text"
              >
                Карточка в 2ГИС
              </a>
            </p>
            <p>
              <a
                href="/privacy/"
                className="text-[14px] text-ink-soft underline underline-offset-2 transition-colors hover:text-accent-text"
              >
                Политика конфиденциальности
              </a>
            </p>
          </nav>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-[13px] text-ink-soft">
          Данные о графике, рейтинге и способах оплаты приведены по карточке
          компании в 2ГИС и могут измениться.
        </p>
      </div>
    </footer>
  );
}
