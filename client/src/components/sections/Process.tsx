import { steps } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="bg-ink border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="reveal mb-14">
          <p className="section-kicker text-copper">
            <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 03 / Процесс работы
          </p>
          <h2 className="mt-7 max-w-2xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
            Прозрачный путь
            <br />
            <span className="text-paper/40">от звонка до выдачи.</span>
          </h2>
        </div>
        <div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="reveal bg-ink p-7 transition-colors hover:bg-white/[0.03]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="font-display text-3xl font-bold text-copper">{item.step}</span>
              <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-paper/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
