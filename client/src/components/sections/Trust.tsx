import { Clock3, Route, ShieldCheck, Wrench } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Подтверждённый рейтинг",
    text: "4.8 на основе 150 оценок в 2GIS — реальный опыт автовладельцев.",
  },
  {
    icon: Clock3,
    title: "До позднего вечера",
    text: "Сервис открыт каждый день с 09:00 до 24:00 (удобно после работы).",
  },
  {
    icon: Route,
    title: "Понятная локация",
    text: "Улица Озбекали Жанибек, 30Б, район Сарайшык. Рядом 3 парковки.",
  },
  {
    icon: Wrench,
    title: "Универсальная база",
    text: "Кузов, сварка, токарка, мотор и автоэлектрика на одной площадке.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="bg-copper py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div className="reveal">
            <p className="section-kicker text-ink/60">
              <span className="mr-3 inline-block h-px w-8 bg-ink/60 align-middle" /> 04 / Почему Сунақ
            </p>
            <h2 className="mt-8 max-w-lg font-display text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">
              Доверие — это то, что остаётся после ремонта.
            </h2>
          </div>
          <div className="grid gap-px border border-ink/20 bg-ink/20 sm:grid-cols-2">
            {trustItems.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className="scroll-reveal bg-copper p-7 sm:p-8"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <Icon className="h-6 w-6 text-ink/65" />
                <h3 className="mt-14 font-display text-2xl font-medium tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
