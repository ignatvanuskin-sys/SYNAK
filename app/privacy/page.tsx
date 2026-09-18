import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { company } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Сунақ — СТО в Астане",
  description:
    "Какие данные собирает сайт СТО «Сунақ» и как они используются. Сайт не собирает платёжные данные и не передаёт данные третьим лицам.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="shell max-w-3xl py-16 md:py-24">
        <h1 className="section-title">Политика конфиденциальности</h1>

        <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
          <p>
            Сайт СТО «Сунақ» не собирает персональные данные автоматически и не
            использует трекинг-скрипты для отслеживания посетителей.
          </p>

          <h2 className="font-heading text-[20px] font-bold text-ink">
            Какие данные обрабатываются
          </h2>
          <p>
            Сайт содержит ссылки на внешние сервисы: звонок по номеру телефона,{' '}
            <a
              href={company.links.whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              WhatsApp
            </a>{' '}
            и карточку компании в 2ГИС. Если вы позвоните, напишите в WhatsApp
            или перейдёте на внешний сайт, обработка данных регулируется
            правилами соответствующего сервиса и вашими действиями.
          </p>

          <h2 className="font-heading text-[20px] font-bold text-ink">
            Что сайт не делает
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Не собирает платёжные данные.</li>
            <li>Не хранит введённую вами информацию на своих серверах.</li>
            <li>Не передаёт данные третьим лицам.</li>
            <li>Не требует регистрации.</li>
          </ul>

          <h2 className="font-heading text-[20px] font-bold text-ink">
            Контакты
          </h2>
          <p>
            По любым вопросам вы можете связаться с СТО по телефону{' '}
            <a
              href={`tel:+${company.phone.raw}`}
              className="font-semibold text-accent"
            >
              {company.phone.display}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
