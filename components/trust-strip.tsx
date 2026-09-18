import { company } from "@/lib/company-data";

const facts = [
  {
    icon: "star",
    value: `${company.rating.display} в ${company.rating.source}`,
    note: "рейтинг СТО",
  },
  {
    icon: "check",
    value: "Подтверждённая карточка",
    note: "данные 2ГИС",
  },
  {
    icon: "clock",
    value: "Ежедневно до 24:00",
    note: "график работы",
  },
  {
    icon: "bus",
    value: "300 м до «Кобыз»",
    note: "остановка рядом",
  },
] as const;

function FactIcon({ name }: { name: "star" | "check" | "clock" | "bus" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "star")
    return (
      <svg {...common}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...common}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  if (name === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="4" y="11" width="16" height="7" rx="2" />
      <path d="M6 11V8a2 2 0 0 1 2-2h3l2 5" />
      <circle cx="7.5" cy="18" r="1" />
      <circle cx="16.5" cy="18" r="1" />
    </svg>
  );
}

/** TrustStrip — компактная полоса фактов под hero */
export function TrustStrip() {
  return (
    <section aria-label="Факты о СТО" className="border-y border-line bg-card">
      <div className="shell">
        <ul className="grid grid-cols-2 divide-x divide-line md:grid-cols-4">
          {facts.map((fact) => (
            <li
              key={fact.value}
              className="flex items-center gap-3 px-4 py-5 md:px-6 md:py-6"
            >
              <span className="hidden shrink-0 text-accent sm:block">
                <FactIcon name={fact.icon} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-heading text-[15px] font-bold text-ink md:text-[16px]">
                  {fact.value}
                </span>
                <span className="block truncate text-[12px] text-ink-soft md:text-[13px]">
                  {fact.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
