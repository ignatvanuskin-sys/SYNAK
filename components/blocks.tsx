import { company } from "@/lib/company-data";
import { Section, WhatsAppLink, ArrowRightIcon } from "@/components/ui";

/* ---------- Иконки преимуществ ---------- */

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const benefitIcons = [LayersIcon, ClockIcon, ChatIcon, MapPinIcon];

const benefits = [
  {
    title: "Несколько направлений в одном месте",
    description:
      "Кузовные работы, сварка, металлообработка, автоэлектрика и ремонт бензиновых двигателей указаны в карточке автосервиса.",
  },
  {
    title: "Удобный график",
    description: "По данным 2ГИС, СТО работает ежедневно с 09:00 до 24:00.",
  },
  {
    title: "Можно быстро связаться",
    description:
      "Позвоните или напишите в WhatsApp, чтобы описать проблему и уточнить дальнейшие действия.",
  },
  {
    title: "Удобное расположение",
    description:
      "Адрес: улица Озбекали Жанибек, 30Б. Рядом находится остановка «Кобыз».",
  },
] as const;

/** BenefitsSection — рациональные причины обратиться */
export function Benefits() {
  return (
    <Section id="benefits">
      <div className="shell">
        <div className="reveal max-w-2xl">
          <p className="section-label">Почему мы</p>
          <h2 className="section-title">
            Почему удобно обратиться в «Сунақ»
          </h2>
        </div>

        <ul className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12">
          {benefits.map((benefit, i) => {
            const Icon = benefitIcons[i % benefitIcons.length];
            return (
              <li
                key={benefit.title}
                className="flex gap-4 rounded-card border border-line bg-card p-6 md:p-7"
              >
                <span className="hidden shrink-0 sm:inline-flex sm:h-11 sm:w-11 sm:items-center sm:justify-center sm:rounded-card sm:bg-accent-soft sm:text-accent">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <h3 className="font-heading text-[18px] font-bold leading-snug text-ink md:text-[19px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">
                    {benefit.description}
                  </p>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- ProcessSteps ---------- */

const processSteps = [
  {
    title: "Опишите проблему",
    description:
      "Позвоните или напишите в WhatsApp. Укажите марку автомобиля и что произошло.",
  },
  {
    title: "Согласуйте визит",
    description:
      "Уточните, можно ли приехать с вашей задачей в удобное время.",
  },
  {
    title: "Привезите автомобиль",
    description:
      "Адрес СТО: улица Озбекали Жанибек, 30Б, Астана.",
  },
  {
    title: "Уточните объём и стоимость работ",
    description:
      "Итоговая стоимость зависит от вида работ и состояния автомобиля — её согласуют до начала ремонта.",
  },
] as const;

/** ProcessSteps — как снизить неопределённость перед обращением */
export function Process() {
  return (
    <Section id="how" className="bg-ink text-white">
      <div className="shell">
        <div className="reveal max-w-2xl">
          <p className="section-label text-accent-bright">Порядок работы</p>
          <h2 className="section-title text-white">Как начать ремонт</h2>
        </div>

        <ol className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-12">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-card border border-white/15 bg-white/5 p-6"
            >
              <span
                aria-hidden="true"
                className="font-heading text-[30px] font-extrabold leading-none text-accent-bright"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-heading text-[17px] font-bold leading-snug text-white md:text-[18px]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-10">
          <WhatsAppLink
            className="btn btn-primary"
            text="Здравствуйте! Хочу уточнить детали перед визитом на СТО."
          >
            <ArrowRightIcon />
            <span>Уточнить перед визитом</span>
          </WhatsAppLink>
        </div>
      </div>
    </Section>
  );
}
