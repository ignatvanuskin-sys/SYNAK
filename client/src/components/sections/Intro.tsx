export function Intro() {
  return (
    <section id="intro" className="bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[.72fr_1fr] lg:gap-24 lg:px-12">
        <div className="reveal">
          <p className="section-kicker text-copper">
            <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 01 / О сервисе
          </p>
          <h2 className="mt-8 max-w-md font-display text-5xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-7xl">
            Не обещаем лишнего. Делаем по делу.
          </h2>
        </div>
        <div className="reveal max-w-2xl" style={{ animationDelay: "120ms" }}>
          <p className="text-xl leading-8 text-ink/75 sm:text-2xl sm:leading-9">
            Сунақ — подтверждённый легковой автосервис в районе Сарайшык. Сюда
            приезжают, когда нужна не просто замена расходников, а реальная
            слесарная, сварочная или токарная работа: восстановление сорванной
            резьбы, глушители, кузов и электроника.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/15 pt-8 sm:grid-cols-4">
            {[
              ["4.8", "рейтинг 2GIS"],
              ["150", "оценок"],
              ["61", "отзыв"],
              ["09—24", "ежедневно"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ink/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
