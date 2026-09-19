import { ArrowUpRight, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const SERVICE_TYPES = [
  "Кузовной ремонт",
  "Металлообработка",
  "Сварочные работы",
  "Автоэлектрика",
  "Стартеры и генераторы",
  "Бензиновый двигатель",
  "Пока не знаю — нужна консультация",
];

export function BookingModal({ open, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState(
    "https://wa.me/77753375793?text=" + encodeURIComponent("Здравствуйте! Пишу с сайта Сунақ."),
  );
  const [formError, setFormError] = useState("");

  useBodyScrollLock(open);
  useFocusTrap(modalRef, open);

  if (!open) return null;

  const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phoneValue = String(data.get("phone") ?? "").trim();
    const vehicle = String(data.get("vehicle") ?? "").trim();
    const serviceType = String(data.get("serviceType") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();

    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const vehicleInput = form.elements.namedItem("vehicle") as HTMLInputElement;
    const serviceTypeInput = form.elements.namedItem("serviceType") as HTMLSelectElement;
    const serviceInput = form.elements.namedItem("service") as HTMLTextAreaElement;

    // Normalize phone: digits only, at least 10
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const phoneIsValid = phoneDigits.length >= 10;

    phoneInput.setCustomValidity(phoneIsValid ? "" : "Введите корректный номер телефона.");
    vehicleInput.setCustomValidity(vehicle.length >= 2 ? "" : "Укажите марку и модель автомобиля.");
    serviceTypeInput.setCustomValidity(serviceType ? "" : "Выберите услугу.");
    serviceInput.setCustomValidity(service.length >= 8 ? "" : "Опишите задачу подробнее (минимум 8 символов).");

    if (!form.checkValidity()) {
      setFormError("Проверьте выделенные поля и заполните их корректно.");
      form.reportValidity();
      return;
    }

    setFormError("");
    const message = `Здравствуйте! Новая заявка с сайта Сунақ.%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phoneValue)}%0AАвтомобиль: ${encodeURIComponent(vehicle)}%0AУслуга: ${encodeURIComponent(serviceType)}%0AОписание: ${encodeURIComponent(service)}`;
    setWhatsappHref(`https://wa.me/77753375793?text=${message}`);
    setSent(true);
  };

  return (
    <div
      className="booking-modal fixed inset-0 z-[70] grid place-items-center bg-[#07152b]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="booking-modal-card relative max-h-[92dvh] w-full max-w-xl overflow-y-auto p-5 text-paper shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-white/25 text-paper"
          aria-label="Закрыть форму записи"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <p className="section-kicker text-paper/70">Запись на сервис</p>
        <h2
          id="booking-title"
          className="mt-4 max-w-md font-display text-4xl font-bold leading-none tracking-[-0.06em] sm:text-5xl"
        >
          Записаться
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-paper/75">
          Оставьте контакты и выберите услугу. После отправки вы получите готовую
          заявку для мастера.
        </p>
        <form onSubmit={handleBooking} className="mt-6 grid gap-4">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Ваше имя"
            aria-label="Ваше имя"
            className="menu-form-field"
          />
          <input
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            title="Введите номер телефона, например +7 775 337 57 93"
            placeholder="Номер телефона"
            aria-label="Номер телефона"
            inputMode="tel"
            className="menu-form-field"
          />
          <input
            id="vehicle"
            name="vehicle"
            required
            placeholder="Автомобиль: Toyota Camry 2018"
            aria-label="Ваш автомобиль"
            className="menu-form-field"
          />
          <select
            id="serviceType"
            name="serviceType"
            required
            defaultValue=""
            aria-label="Какая услуга нужна"
            className="menu-form-field"
          >
            <option value="" disabled>
              Выберите услугу
            </option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            id="service"
            name="service"
            required
            minLength={8}
            placeholder="Что случилось с автомобилем"
            aria-label="Опишите задачу или поломку"
            rows={3}
            className="menu-form-field resize-none"
          />
          <button type="submit" className="menu-submit">
            {sent ? "Заявка сохранена" : "Отправить заявку"}
            <Check className="h-4 w-4" />
          </button>
          {formError && (
            <p role="alert" className="text-xs font-semibold text-red-200">
              {formError}
            </p>
          )}
          {sent && (
            <div className="menu-success" role="status" aria-live="polite">
              <strong>Готово.</strong> Теперь можно отправить заявку мастеру в WhatsApp.
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-bold text-white underline underline-offset-4"
              >
                Открыть WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
