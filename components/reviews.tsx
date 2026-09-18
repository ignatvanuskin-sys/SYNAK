import Image from "next/image";
import { company } from "@/lib/company-data";
import { Section, LinkButton, ArrowRightIcon } from "@/components/ui";

/** ReviewsLink — проверяемая репутация без выдуманных отзывов */
export function Reviews() {
  return (
    <Section id="reviews">
      <div className="shell">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="section-label justify-center">Отзывы</p>
          <h2 className="section-title">Отзывы клиентов в 2ГИС</h2>
          <p className="section-sub mx-auto">
            Посмотрите актуальные оценки и отзывы о СТО «Сунақ» в 2ГИС.
          </p>

          <div className="mt-10 rounded-card border border-line bg-card p-8 md:p-10">
            <Image
              src="/images/reviews-2gis.svg"
              alt="Рейтинг 4,8 в 2ГИС — СТО «Сунақ»"
              width={340}
              height={110}
              loading="lazy"
              className="mx-auto h-auto w-[260px] sm:w-[300px]"
            />
            <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
              {company.rating.note}
            </p>
            <div className="mt-6">
              <LinkButton
                href={company.links.reviews}
                external
                className="btn btn-primary"
              >
                Открыть отзывы в 2ГИС
                <ArrowRightIcon />
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
