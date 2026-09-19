import { MapPin, Route } from "lucide-react";
import { phone, phoneHref, routeHref } from "@/lib/data";

export function Contacts() {
  return (
    <section id="contacts" className="bg-ink border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="reveal mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-kicker text-copper">
              <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 08 / Локация
            </p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
              Как добраться до бокса.
            </h2>
          </div>
          <a
            href={routeHref}
            target="_blank"
            rel="noreferrer"
            className="button-ghost inline-flex items-center gap-3 px-6 py-3 text-xs uppercase tracking-[0.16em]"
          >
            <Route className="h-4 w-4 text-copper" /> Маршрут в 2GIS
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-[360px] overflow-hidden border border-white/15 bg-black/40 sm:min-h-[440px]">
            <iframe
              title="Карта проезда к автосервису Сунақ"
              src="https://www.openstreetmap.org/export/embed.html?bbox=71.4850%2C51.1350%2C71.5050%2C51.1450&layer=mapnik&marker=51.140399%2C71.493193"
              className="h-full w-full border-0 grayscale invert contrast-125"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 border border-white/20 bg-ink/90 p-4 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.14em] text-copper">
                Координаты 2GIS
              </p>
              <p className="font-display text-xs text-paper">71.493193° E, 51.140399° N</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 border border-white/15 bg-ink p-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/40">
                Адрес сервиса
              </span>
              <p className="mt-3 font-display text-2xl font-medium tracking-[-0.03em]">
                ул. Озбекали Жанибек, 30Б
              </p>
              <p className="mt-2 text-sm text-paper/55">
                Юго-Восток (правая сторона), район Сарайшык, Астана
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/40">
                Ориентиры
              </span>
              <ul className="mt-3 space-y-2 text-xs text-paper/60">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-copper" /> Остановка «Кобыз» — 300 м (3 мин)
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-copper" /> Рядом 3 парковочные площадки
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/40">
                Режим работы
              </span>
              <p className="mt-2 font-display text-lg text-paper">Ежедневно: 09:00 — 24:00</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/40">
                Телефон
              </span>
              <a
                href={phoneHref}
                className="mt-2 block font-display text-lg text-paper transition hover:text-copper"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
