import Image from "next/image";
import { company } from "@/lib/company-data";
import {
  PhoneLink,
  WhatsAppLink,
  RouteLink,
  ArrowRightIcon,
} from "@/components/ui";

/** HeroSection — первый экран: кто мы, чем занимаемся, где находимся, что делать дальше */
export function Hero() {
  return (
    <section id="top" className="overflow-hidden" aria-labelledby="hero-title">
      <div className="shell grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
        {/* Текстовая колонка */}
        <div className="fade-up-quick max-w-xl">
          <p className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold uppercase tracking-wider text-accent-text md:text-[14px]">
            <span>СТО в Астане</span>
            <span aria-hidden="true" className="text-ink-soft">·</span>
            <span className="normal-case text-ink-soft">ежедневно 09:00–24:00</span>
          </p>

          <h1
            id="hero-title"
            className="font-heading font-extrabold leading-[1.12] tracking-tight text-ink"
            style={{ fontSize: "clamp(34px, 7.5vw, 56px)" }}
          >
            Кузов, сварка, электрика и двигатель в одном СТО
          </h1>

          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
            Сунақ помогает решить основные задачи по ремонту легкового
            автомобиля: от кузовных и сварочных работ до автоэлектрики,
            металлообработки и ремонта бензиновых двигателей.
          </p>

          <p className="mt-4 flex items-start gap-2 text-[16px] font-medium text-ink">
            <svg
              className="mt-1 shrink-0 text-accent"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              {company.address.locality}, {company.address.full}
            </span>
          </p>

          {/* Основные действия */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PhoneLink className="btn btn-primary w-full sm:w-auto sm:px-8" />
            <WhatsAppLink className="btn btn-secondary w-full sm:w-auto" />
          </div>
          <div className="mt-3">
            <RouteLink className="btn-ghost btn" />
          </div>
        </div>

        {/* Визуал */}
        <figure className="fade-up relative" style={{ animationDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-card border border-line bg-card shadow-lift">
            <Image
              src="/images/workshop-hero.webp"
              alt="Механик осматривает автомобиль в ремонтной зоне СТО «Сунақ»"
              width={1440}
              height={1080}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 text-[13px] text-ink-soft">
            <span>Обычный городской автосервис в Астане</span>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1 font-semibold text-accent-text transition-colors hover:text-ink"
            >
              Фото СТО
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
