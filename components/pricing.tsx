import { company } from "@/lib/company-data";
import { PhoneLink, WhatsAppLink } from "@/components/ui";

/* ---------- PricingClarification ---------- */

/** Честное объяснение отсутствия публичного прайс-листа */
export function PricingClarification() {
  return (
    <section aria-labelledby="pricing-title" className="border-y border-line bg-card">
      <div className="shell grid gap-8 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-16">
        <div className="reveal">
          <h2 id="pricing-title" className="section-title">
            Нужно узнать стоимость?
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
            Публичного прайс-листа в карточке 2ГИС нет. Стоимость зависит от
            конкретной задачи и состояния автомобиля. Позвоните или напишите в
            WhatsApp, чтобы уточнить детали обращения.
          </p>
        </div>
        <div className="reveal flex flex-col gap-3 sm:flex-row md:justify-end">
          <PhoneLink className="btn btn-primary w-full sm:w-auto sm:px-8" />
          <WhatsAppLink className="btn btn-secondary w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
