import { ArrowDownRight, ArrowUpRight, Phone, Star } from "lucide-react";

interface HeroProps {
  onBookingOpen: () => void;
}

export function Hero({ onBookingOpen }: HeroProps) {
  return (
    <section
      id="top"
      className="hero-section relative isolate flex min-h-[720px] items-end overflow-hidden pt-24 sm:min-h-[820px]"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/workshop-hero.webp')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,63,.94)_0%,rgba(16,35,63,.72)_38%,rgba(16,35,63,.18)_76%,rgba(16,35,63,.36)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(16,35,63,.88)_0%,transparent_42%,rgba(16,35,63,.16)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#10233f]/60 to-transparent" />

      <div className="hero-content mx-auto grid w-full max-w-[1400px] items-end gap-12 px-5 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12 lg:pb-28">
        <div className="max-w-4xl">
          <p
            className="reveal mb-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-copper"
            style={{ animationDelay: "80ms" }}
          >
            <span className="h-px w-10 bg-copper" /> Легковой автосервис · Астана
          </p>
          <h1
            className="hero-title reveal font-display text-[clamp(3.3rem,8vw,8.3rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-paper"
            style={{ animationDelay: "180ms" }}
          >
            Здесь важна
            <br />
            <span className="text-copper">каждая деталь.</span>
          </h1>
          <p
            className="hero-description reveal mt-8 max-w-xl text-base leading-7 text-paper/68 sm:text-lg"
            style={{ animationDelay: "280ms" }}
          >
            Сунақ — автосервис в Астане: кузовной ремонт, сварка, металлообработка и
            автоэлектрика. Нажмите «Записаться», укажите автомобиль и услугу — мастер
            подскажет следующий шаг.
          </p>
          <div
            className="reveal mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "380ms" }}
          >
            <button
              type="button"
              onClick={onBookingOpen}
              className="button-copper group inline-flex items-center justify-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em]"
            >
              Записаться
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="tel:+77753375793"
              className="button-ghost inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <Phone className="h-4 w-4 text-copper" /> Позвонить мастеру
            </a>
          </div>
          <p className="mt-4 text-[11px] text-paper/45">
            Астана · ул. Озбекали Жанибек, 30Б · ежедневно 09:00—24:00
          </p>
        </div>

        <div
          className="hero-proof reveal grid grid-cols-2 gap-px border border-white/15 bg-white/15 lg:grid-cols-1"
          style={{ animationDelay: "480ms" }}
        >
          <a
            href="https://2gis.kz/astana/firm/70000001062595900/tab/reviews"
            target="_blank"
            rel="noreferrer"
            className="hero-proof-card bg-ink/80 p-6 backdrop-blur-md transition hover:bg-ink"
          >
            <div className="mb-8 flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Рейтинг 2GIS
              </span>
              <Star className="h-4 w-4 fill-copper text-copper" />
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display text-6xl font-semibold leading-none tracking-[-0.06em]">
                4.8
              </span>
              <span className="pb-1 text-xs text-paper/50">из 5</span>
            </div>
            <p className="mt-3 text-xs text-paper/55">150 оценок · 61 отзыв</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-copper">
              Источник: 2GIS ↗
            </p>
          </a>
          <div className="hero-proof-card bg-ink/80 p-6 backdrop-blur-md">
            <div className="mb-8 flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Режим работы
              </span>
              <span className="h-2 w-2 rounded-full bg-copper shadow-[0_0_14px_rgba(23,105,224,.9)]" />
            </div>
            <p className="font-display text-2xl font-medium tracking-[-0.03em]">
              Ежедневно
            </p>
            <p className="mt-3 text-xs text-paper/55">09:00 — 24:00 (до полуночи)</p>
          </div>
        </div>
      </div>
      <a
        href="#intro"
        className="absolute bottom-8 right-5 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-paper/50 transition hover:text-paper sm:flex lg:right-12"
      >
        Листать <ArrowDownRight className="h-4 w-4 text-copper" />
      </a>
    </section>
  );
}
