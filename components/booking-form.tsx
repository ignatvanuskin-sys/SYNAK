"use client";

import { useState } from "react";
import { company } from "@/lib/company-data";
import { Spinner, WhatsAppIcon, PhoneIcon } from "@/components/ui";

type FormStatus = "idle" | "loading" | "success" | "error";

const bookingServices = [
  "Кузовной ремонт",
  "Покраска / ремонт вмятин",
  "Сварочные работы",
  "Токарные / фрезерные работы",
  "Автоэлектрика / стартер / генератор",
  "Ремонт бензинового двигателя",
  "Другое — нужна консультация",
] as const;

function buildMessage(name: string, phone: string, car: string, service: string) {
  const lines = ["Здравствуйте! Хочу записаться на СТО «Сунақ»."];
  if (name.trim()) lines.push(`Имя: ${name.trim()}`);
  lines.push(`Телефон: ${phone.trim()}`);
  if (car.trim()) lines.push(`Авто: ${car.trim()}`);
  lines.push(`Услуга: ${service}`);
  return lines.join("\n");
}

/** Форма записи. Без backend: сообщение открывается в WhatsApp. */
export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [service, setService] = useState<string>(bookingServices[0]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [phoneError, setPhoneError] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setStatus("loading");
    const url = company.links.whatsapp(buildMessage(name, phone, car, service));
    try {
      // noopener: window.open всегда возвращает null — блокировку не определить,
      // поэтому не показываем ложную ошибку при успешно открытом WhatsApp.
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-btn border-2 bg-card px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft/70 transition-colors focus:outline-none focus-visible:outline-none focus:border-accent";

  return (
    <section id="booking" aria-labelledby="booking-title">
      <div className="py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Пояснение */}
          <div className="reveal">
            <p className="section-label">Онлайн-запись</p>
            <h2 id="booking-title" className="section-title">
              Записаться на ремонт
            </h2>
            <p className="section-sub">
              Оставьте имя, телефон и марку автомобиля, выберите услугу —
              откроется WhatsApp с готовым сообщением. Мы ответим и подтвердим
              визит.
            </p>

            <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-ink-soft">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                Форма не отправляет данные на сервер — только открывает WhatsApp.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                Не вводите платёжные данные — они не нужны.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                Быстрее всего — просто позвонить:{" "}
                <a
                  href={`tel:+${company.phone.raw}`}
                  className="font-semibold text-accent-text transition-colors hover:text-ink"
                >
                  {company.phone.display}
                </a>
              </li>
            </ul>
          </div>

          {/* Форма */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="reveal rounded-card border border-line bg-card p-6 shadow-lift md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="booking-name" className="mb-1.5 block text-[14px] font-semibold text-ink">
                  Имя <span className="font-normal text-ink-soft">(необязательно)</span>
                </label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Например, Алексей"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputBase}
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="mb-1.5 block text-[14px] font-semibold text-ink">
                  Телефон или WhatsApp <span aria-hidden="true" className="text-error">*</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  aria-required="true"
                  aria-invalid={phoneError}
                  aria-describedby={phoneError ? "booking-phone-error" : undefined}
                  placeholder="+7 ___ ___ __ __"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError(false);
                  }}
                  className={`${inputBase} ${phoneError ? "border-error" : ""}`}
                  disabled={status === "loading"}
                />
                {phoneError && (
                  <p id="booking-phone-error" role="alert" className="mt-1.5 text-[13px] font-medium text-error">
                    Укажите номер телефона или WhatsApp.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-car" className="mb-1.5 block text-[14px] font-semibold text-ink">
                  Марка и модель автомобиля <span className="font-normal text-ink-soft">(необязательно)</span>
                </label>
                <input
                  id="booking-car"
                  name="car"
                  type="text"
                  autoComplete="off"
                  placeholder="Например, Toyota Camry 2015"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                  className={inputBase}
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="booking-service" className="mb-1.5 block text-[14px] font-semibold text-ink">
                  Услуга
                </label>
                <select
                  id="booking-service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${inputBase} appearance-none`}
                  disabled={status === "loading"}
                >
                  {bookingServices.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary w-full"
              >
                {status === "loading" ? (
                  <>
                    <Spinner />
                    <span>Открываем WhatsApp…</span>
                  </>
                ) : (
                  <>
                    <WhatsAppIcon />
                    <span>Записаться через WhatsApp</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div role="status" className="rounded-card border-2 border-success/30 bg-success/10 px-4 py-3 text-[14px] font-medium text-success">
                  <p>Сообщение подготовлено. Завершите отправку в WhatsApp.</p>
                  <p className="mt-1.5">
                    Если WhatsApp не открылся — позвоните:{" "}
                    <a href={`tel:+${company.phone.raw}`} className="font-bold underline underline-offset-2">
                      {company.phone.display}
                    </a>
                  </p>
                </div>
              )}

              {status === "error" && (
                <div role="alert" className="rounded-card border-2 border-error/30 bg-error/10 px-4 py-3 text-[14px] font-medium text-error">
                  Не удалось открыть WhatsApp. Позвоните по номеру{" "}
                  <a href={`tel:+${company.phone.raw}`} className="inline-flex items-center gap-1 font-bold underline underline-offset-2">
                    <PhoneIcon className="h-3.5 w-3.5" />
                    {company.phone.display}
                  </a>
                </div>
              )}

              <p className="text-[13px] leading-relaxed text-ink-soft">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy/" className="underline underline-offset-2 transition-colors hover:text-ink">
                  политикой конфиденциальности
                </a>
                . Данные не сохраняются на сайте.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
