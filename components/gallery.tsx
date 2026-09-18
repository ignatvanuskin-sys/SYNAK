"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { company } from "@/lib/company-data";

const galleryItems = [
  {
    src: "/images/workshop-hero.webp",
    alt: "Ремонтная зона СТО «Сунақ»: механик осматривает автомобиль",
    caption: "Ремонтная зона",
  },
  {
    src: "/images/body-repair.webp",
    alt: "Механик устраняет вмятину на легковом автомобиле в СТО «Сунақ»",
    caption: "Ремонт вмятин",
  },
  {
    src: "/images/welding.webp",
    alt: "Контролируемая сварка автомобиля в СТО «Сунақ»",
    caption: "Сварочные работы",
  },
  {
    src: "/images/metalworking.webp",
    alt: "Токарная обработка автомобильной детали в СТО «Сунақ»",
    caption: "Металлообработка",
  },
  {
    src: "/images/auto-repair.webp",
    alt: "Проверка автомобильной электрики мультиметром в СТО «Сунақ»",
    caption: "Автоэлектрика",
  },
  {
    src: "/images/workshop-exterior.webp",
    alt: "Вход в СТО «Сунақ» с улицы Озбекали Жанибек, 30Б, Астана",
    caption: "Вход на СТО",
  },
] as const;

/** Gallery — blur-up загрузка, lightbox по клику, закрытие по Escape и клику на фон */
export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length
        );
    };
    document.addEventListener("keydown", onKeyDown);
    const scrollY = window.scrollY;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, close]);

  return (
    <section id="gallery" aria-labelledby="gallery-title">
      <div className="py-16 md:py-24">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="section-label">Фото</p>
            <h2 id="gallery-title" className="section-title">
              Автосервис изнутри
            </h2>
            <p className="section-sub">
              Как выглядит и работает СТО «Сунақ». Нажмите на фото, чтобы
              увеличить.
            </p>
          </div>

          {/* Desktop: сетка. Mobile: горизонтальный свайп */}
          <div className="reveal mt-10 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
            {/* Крупное фото */}
            <figure className="swipe-scroll relative -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 lg:col-span-3 lg:row-span-2 lg:mx-0 lg:block lg:p-0">
              {galleryItems.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Увеличить фото: ${item.caption}`}
                  className="group relative w-[82vw] shrink-0 snap-center overflow-hidden rounded-card border border-line bg-card sm:w-[64vw] lg:w-full lg:shrink"
                >
                  <span
                    aria-hidden="true"
                    className={`block transition-opacity duration-300 ${
                      loaded[item.src] ? "opacity-0" : "opacity-100"
                    } absolute inset-0 animate-pulse bg-ink/5`}
                  />
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={i === 0 ? 1440 : 1200}
                    height={i === 0 ? 1080 : 900}
                    loading="lazy"
                    sizes="(max-width: 1024px) 82vw, 560px"
                    onLoad={() =>
                      setLoaded((state) => ({ ...state, [item.src]: true }))
                    }
                    className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                  {item.caption && (
                    <figcaption className="absolute bottom-0 left-0 bg-ink/75 px-3 py-1.5 text-[12px] font-semibold text-white">
                      {item.caption}
                    </figcaption>
                  )}
                </button>
              ))}
            </figure>

            {/* Подпись-ссылка на 2ГИС */}
            <a
              href={company.links.card}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-semibold text-accent-text hover:text-ink lg:col-start-4"
            >
              Больше фото в 2ГИС
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          onClick={close}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Закрыть просмотр"
            className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-btn text-white"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <figure
            className="fade-up max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[activeIndex!].src}
              alt={galleryItems[activeIndex!].alt}
              width={1440}
              height={1080}
              className="max-h-[80vh] w-auto rounded-card"
              priority
            />
            <figcaption className="mt-3 text-center text-[14px] text-white/80">
              {galleryItems[activeIndex!].caption}
              {galleryItems.length > 1 && (
                <span className="ml-2 text-white/50">
                  {activeIndex! + 1} / {galleryItems.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
