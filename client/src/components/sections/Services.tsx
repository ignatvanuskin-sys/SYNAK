import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/data";

const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "01": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 17h14l1-7-4-3-2 2H8L6 7 2 10z" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
  "02": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 6l-4 4-4-4 4-4 4 4z" /><path d="M9 9l-3 3 3 3 3-3-3-3z" />
      <path d="M15 15l3-3-3-3" />
    </svg>
  ),
  "03": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6m0 0l-3-3m3 3l3-3" /><path d="M5 12h14" />
      <path d="M5 12v8h14v-8" />
    </svg>
  ),
  "04": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 7l-5 5 5 5" /><path d="M3 12h6" /><path d="M14 12h7" />
    </svg>
  ),
  "05": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "06": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 17h14l1-7-4-3-2 2H8L6 7 2 10z" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
};

export function Services() {
  return (
    <section id="services" className="bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
          <div className="reveal">
            <p className="section-kicker text-copper">
              <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 02 / Что делаем
            </p>
            <h2 className="mt-7 max-w-2xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">
              Решаем сложное
              <br />
              <span className="text-paper/45">спокойно.</span>
            </h2>
          </div>
          <p
            className="reveal max-w-sm text-sm leading-6 text-paper/55 lg:pb-1"
            style={{ animationDelay: "120ms" }}
          >
            Реальные категории услуг по данным карточки 2GIS. Если задача
            нестандартная — свяжитесь с мастером напрямую.
          </p>
        </div>

        <div className="grid gap-px border-y border-white/15 bg-white/15">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.number];
            return (
              <div
                key={service.number}
                className="group scroll-reveal grid gap-5 bg-ink py-7 transition-colors hover:bg-paper hover:text-ink sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:py-8"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <span className="font-display text-sm text-copper">{service.number}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-paper/50 transition-colors group-hover:text-ink/60">
                    {service.detail}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:gap-8">
                  {Icon && <Icon className="h-6 w-6 text-paper/35 transition-colors group-hover:text-copper" />}
                  <ArrowUpRight className="h-5 w-5 text-copper transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.17em] text-paper/40">
          <span className="inline-flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-copper" /> Реальные категории из 2GIS
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-copper" /> По данным 2GIS: наличный расчёт, перевод с карты и через банк
          </span>
        </div>
      </div>
    </section>
  );
}
