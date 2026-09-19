import { phone, phoneHref } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-paper sm:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto_auto] lg:items-end lg:px-12">
        <div>
          <a href="#top" className="font-display text-3xl font-semibold tracking-[-0.06em]">
            СУНАҚ<span className="text-copper">.</span>
          </a>
          <p className="mt-4 max-w-xs text-xs leading-5 text-paper/45">
            Легковой автосервис в Астане.
            <br />
            Улица Озбекали Жанибек, 30Б.
          </p>
        </div>
        <div className="text-xs leading-6 text-paper/55">
          <p className="uppercase tracking-[0.16em] text-paper/35">Режим работы</p>
          <p className="mt-2">Ежедневно · 09:00—24:00</p>
        </div>
        <div className="text-xs leading-6 text-paper/55">
          <p className="uppercase tracking-[0.16em] text-paper/35">Контакты</p>
          <a href={phoneHref} className="mt-2 block transition hover:text-paper">
            {phone}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-white/10 px-5 pt-5 text-[10px] uppercase tracking-[0.14em] text-paper/30 sm:flex-row sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} СТО Сунақ (Астана)</span>
        <span>Официальные данные, адрес и фото подтверждены по карточке 2GIS</span>
      </div>
    </footer>
  );
}
