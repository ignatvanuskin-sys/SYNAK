import { company, services, problems, whatsappDefaultText } from "@/lib/company-data";
import { Section, WhatsAppLink, ArrowRightIcon } from "@/components/ui";

/* ---------- Самодостаточные иконки услуг ---------- */

function KuzovIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h6.2a2 2 0 0 1 1.6.8L18 10l3 .8a1 1 0 0 1 .7 1V15a1 1 0 0 1-1 1h-1" />
      <path d="M6 16H5a1 1 0 0 1-1-1v-2" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
      <path d="M9 17h5.5" />
    </svg>
  );
}

function MetalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ElectroIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L4.5 12.5H11L9 22l8.5-10.5H11L13 2z" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9h2V7h4v2h2l2 2h2v-2h2v6h-2v-2h-2l-2 2h-2v2H8v-2H6l-2-2H2v-4h2V9z" />
  </svg>
  );
}

const serviceIcons = [KuzovIcon, MetalIcon, ElectroIcon, EngineIcon] as const;

/* ---------- Иконки «С чем можно обратиться» ---------- */

function ProblemIcon({ index }: { index: number }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (index % 6) {
    case 0: // вмятина/покраска
      return (
        <svg {...common}>
          <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h6.2a2 2 0 0 1 1.6.8L18 10l3 .8a1 1 0 0 1 .7 1V15a1 1 0 0 1-1 1h-1" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
        </svg>
      );
    case 1: // сварка
      return (
        <svg {...common}>
          <path d="M13 2L4.5 12.5H11L9 22l8.5-10.5H11L13 2z" />
        </svg>
      );
    case 2: // токарные/фрезерные
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
        </svg>
      );
    case 3: // стартер/генератор
      return (
        <svg {...common}>
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <path d="M18 10h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2M6 7V5M12 7V5" />
        </svg>
      );
    case 4: // электронная система
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      );
    default: // бензиновый двигатель
      return (
        <svg {...common}>
          <path d="M6 9h2V7h4v2h2l2 2h2v-2h2v6h-2v-2h-2l-2 2h-2v2H8v-2H6l-2-2H2v-4h2V9z" />
        </svg>
      );
  }
}

/* ---------- ServicesGrid ---------- */

export function Services() {
  return (
    <Section id="services">
      <div className="shell">
        <div className="reveal max-w-2xl">
          <p className="section-label">Услуги</p>
          <h2 className="section-title">Какие работы выполняем</h2>
          <p className="section-sub">
            Основные направления СТО «Сунақ» для легковых автомобилей.
          </p>
        </div>

        <ul className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12">
          {services.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <li
                key={service.title}
                className="rounded-card border border-line bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift md:p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-accent-soft text-accent">
                  <Icon />
                </span>
                <h3 className="mt-5 font-heading text-[19px] font-bold text-ink md:text-[20px]">
                  {service.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-8">
          <WhatsAppLink text={whatsappDefaultText} className="btn btn-primary">
            <ArrowRightIcon />
            <span>Уточнить по моей проблеме</span>
          </WhatsAppLink>
        </div>
      </div>
    </Section>
  );
}

/* ---------- ProblemList ---------- */

export function ProblemList() {
  return (
    <Section id="problems" className="border-y border-line bg-card py-14 md:py-20">
      <div className="shell">
        <div className="reveal max-w-2xl">
          <h2 className="section-title">С чем можно обратиться</h2>
        </div>

        <ul className="reveal mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <li
              key={problem}
              className="flex items-start gap-3 rounded-card border border-line bg-surface p-5"
            >
              <span className="mt-0.5 shrink-0 text-accent">
                <ProblemIcon index={i} />
              </span>
              <span className="text-[16px] font-medium leading-snug text-ink">
                {problem}
              </span>
            </li>
          ))}
        </ul>

        <p className="reveal mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Если вы не знаете точное название неисправности, просто опишите
          симптомы по телефону{" "}
          <a
            href={`tel:+${company.phone.raw}`}
            className="font-semibold text-accent-text transition-colors hover:text-ink"
          >
            {company.phone.display}
          </a>{" "}
          или в WhatsApp.
        </p>
      </div>
    </Section>
  );
}
