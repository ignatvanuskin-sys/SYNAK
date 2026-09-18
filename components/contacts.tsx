import { company } from "@/lib/company-data";
import {
  Section,
  PhoneLink,
  WhatsAppLink,
  RouteLink,
  PhoneIcon,
  WhatsAppIcon,
  RouteIcon,
  LinkButton,
} from "@/components/ui";

/** ContactSection — контакты + статичный блок карты (без нагрузки на первый экран) */
export function Contacts() {
  return (
    <Section id="contacts" className="bg-ink text-white">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Информация */}
        <div className="reveal">
          <p className="section-label text-accent-bright">Контакты</p>
          <h2 className="section-title text-white">
            Приезжайте или напишите заранее
          </h2>

          <div className="mt-8 space-y-5">
            <div>
              <h3 className="font-heading text-[16px] font-bold text-white/60">
                СТО
              </h3>
              <p className="mt-1 font-heading text-[22px] font-extrabold text-white">
                Сунақ, СТО
              </p>
            </div>

            <div>
              <h3 className="font-heading text-[16px] font-bold text-white/60">
                Адрес
              </h3>
              <p className="mt-1 text-[19px] leading-snug text-white">
                {company.address.locality}, {company.address.full}
              </p>
              <p className="mt-0.5 text-[14px] text-white/60">
                {company.address.district} · {company.address.note}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-[16px] font-bold text-white/60">
                График
              </h3>
              <p className="mt-1 text-[19px] text-white">
                {company.hours.withSource}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-[16px] font-bold text-white/60">
                Телефон
              </h3>
              <a
                href={`tel:+${company.phone.raw}`}
                className="mt-1 inline-block text-[26px] font-bold tracking-tight text-white transition-colors hover:text-accent"
              >
                {company.phone.display}
              </a>
            </div>

            <div>
              <h3 className="font-heading text-[16px] font-bold text-white/60">
                Способы оплаты
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-white/70">
                По данным 2ГИС: наличный расчёт, оплата через банк, перевод с
                карты. Способ оплаты лучше уточнить перед визитом.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PhoneLink className="btn btn-primary w-full sm:w-auto sm:px-7" />
            <WhatsAppLink className="btn w-full bg-white text-ink hover:bg-white/85 sm:w-auto" />
            <RouteLink className="btn btn-ghost w-full !text-white/80 hover:!text-white sm:w-auto" />
          </div>
        </div>

        {/* Карта — статичный блок, загружается ниже первого экрана */}
        <div className="reveal lg:pt-24">
          <div className="overflow-hidden rounded-card border border-white/15">
            {/* Статичный «плиточный» блок вместо тяжёлого embed */}
            <a
              href={company.links.map}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть карту СТО «Сунақ» в 2ГИС"
              className="group relative block h-[280px] w-full bg-white/[0.06] sm:h-[340px]"
            >
              {/* Стилизованные «улицы» карты — чистый CSS/CSS-фон */}
              <span aria-hidden="true" className="absolute inset-0">
                <span className="absolute left-0 top-1/3 h-[3px] w-full -rotate-2 bg-white/15" />
                <span className="absolute left-1/4 top-0 h-full w-[3px] rotate-3 bg-white/10" />
                <span className="absolute left-0 top-2/3 h-[2px] w-full rotate-1 bg-white/10" />
                <span className="absolute right-1/4 top-0 h-full w-[2px] -rotate-2 bg-white/10" />
              </span>

              {/* Маркер СТО */}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-pop">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
              </span>

              {/* CTA поверх блока */}
              <span className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-btn bg-white px-4 py-3 text-[15px] font-semibold text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                <RouteIcon className="h-4 w-4" />
                Открыть в 2ГИС
              </span>
            </a>

            <div className="border-t border-white/15 p-5">
              <p className="text-[13px] leading-relaxed text-white/60">
                СТО находится на жилом массиве, правая сторона. Рядом остановка
                «Кобыз» (~300 м). Парковка: 3 парковочных места по данным 2ГИС.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
