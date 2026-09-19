import { ArrowUpRight, Star } from "lucide-react";
import { reviews } from "@/lib/data";

export function Reviews() {
  return (
    <section id="reviews" className="bg-ink py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1fr] lg:gap-24">
          <div className="reveal">
            <p className="section-kicker text-copper">
              <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 06 / Отзывы клиентов
            </p>
            <div className="mt-8 flex items-end gap-4">
              <span className="font-display text-7xl font-semibold leading-none tracking-[-0.08em]">
                4.8
              </span>
              <span className="pb-2 text-sm text-paper/50">/ 5</span>
            </div>
            <div className="mt-5 flex gap-1 text-copper" aria-label="Рейтинг 4.8 из 5">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current opacity-60" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-paper/55">
              Реальные отзывы автовладельцев из карточки Сунақ в 2GIS.
            </p>
            <a
              href="https://2gis.kz/astana/firm/70000001062595900/tab/reviews"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-copper transition hover:text-paper"
            >
              Читать все отзывы в 2GIS <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-3">
            {reviews.map((review, index) => (
              <article
                key={review.author}
                className="reveal border border-white/15 p-7 transition-colors hover:border-copper/60 sm:p-9"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-copper">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-paper/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <blockquote className="mt-8 max-w-2xl font-display text-2xl leading-[1.15] tracking-[-0.04em] text-paper sm:text-3xl">
                  &laquo;{review.quote}&raquo;
                </blockquote>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-paper/45">
                  <span className="text-paper/75">{review.author}</span>
                  <span className="h-1 w-1 rounded-full bg-copper" />
                  {review.meta}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
