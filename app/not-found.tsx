import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { company } from "@/lib/company-data";
import { ArrowRightIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Страница не найдена | Сунақ — СТО в Астане",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="shell max-w-2xl py-24 md:py-32">
        <p className="section-label">404</p>
        <h1 className="section-title">Страница не найдена</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
          Вернитесь на главную страницу или свяжитесь с СТО «Сунақ».
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="/" className="btn btn-primary">
            На главную
            <ArrowRightIcon />
          </a>
          <a href={`tel:+${company.phone.raw}`} className="btn btn-secondary">
            Позвонить
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
