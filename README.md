# Сунақ — СТО в Астане

Одностраничный сайт автосервиса «Сунақ» (Астана, улица Озбекали Жанибек, 30Б).

Стек: **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, полная статическая генерация (`output: "export"`).

## Команды

```bash
npm install        # установка
npm run dev        # разработка
npm run build      # статическая сборка в out/
npm run lint       # ESLint (next/core-web-vitals)
npm run serve      # локальный сервер out/ на :8080 (gzip, cache)
npm run qa         # Playwright-проверки: overflow, меню, FAQ, lightbox, 404, privacy, якоря
npm run lighthouse # Lighthouse-прогон (P/A/BP/SEO)
npm run icons      # регенерация PNG-фоллбеков favicon из favicon.svg
```

Готовый сайт лежит в `out/` — это полная статика, которую можно публиковать на любом статическом хостинге (Netlify, Cloudflare Pages, GitHub Pages, обычный nginx).

Security- и cache-заголовки для Netlify/Cloudflare задаются файлом `public/_headers` (копируется в `out/`). CI (lint + build + артефакт `out/`) — `.github/workflows/ci.yml`.

## Структура

```
app/
  layout.tsx          # шрифты, SEO, Open Graph, JSON-LD (AutoRepair)
  page.tsx            # сборка секций
  globals.css         # дизайн-токены (CSS variables), утилиты
  not-found.tsx       # страница 404
  privacy/page.tsx    # политика конфиденциальности

components/
  ui.tsx              # Button, PhoneLink, WhatsAppLink, RouteLink, иконки
  header.tsx          # StickyHeader + MobileMenu
  mobile-menu.tsx     # off-canvas меню (Escape, scroll lock)
  hero.tsx            # первый экран
  trust-strip.tsx     # полоса фактов
  services.tsx        # ServicesGrid + ProblemList
  blocks.tsx          # BenefitsSection + ProcessSteps
  pricing.tsx         # честный блок стоимости
  gallery.tsx         # фото + lightbox
  reviews.tsx         # рейтинг со ссылкой на 2ГИС
  faq.tsx             # аккордеон
  contacts.tsx        # контакты + статичный блок карты
  mobile-cta.tsx      # нижняя панель Позвонить/WhatsApp
  footer.tsx
  reveal-observer.tsx # лёгкий reveal при прокрутке

lib/company-data.ts   # ЕДИНЫЙ источник: телефон, адрес, график, ссылки
scripts/              # утилиты сборки изображений и проверки качества
public/
  images/             # документальные фото (WebP) — ЗАМЕНИТЬ на реальные
  favicon.svg
  og-image.jpg
  robots.txt
  sitemap.xml
```

## Единый источник данных

Телефон, адрес, график и все ссылки заданы **только** в `lib/company-data.ts`.
Все компоненты берут значения оттуда. Поменялся номер — правится в одном месте.

- Телефон: `+7 775 337 5793` (tel: и wa.me — номер `77753375793`)
- WhatsApp: `https://wa.me/77753375793`
- 2ГИС: `https://2gis.kz/astana/firm/70000001062595900`
- График: ежедневно 09:00–24:00 (по карточке 2ГИС)

## Данные и правила

Сайт содержит **только подтверждённые** данные из карточки 2ГИС:

- название, категория, город, адрес, район
- телефон и WhatsApp
- график (русская версия карточки)
- рейтинг 4,8 (формулировка со ссылкой на карточку, без зашитых чисел отзывов)
- остановка «Кобыз» (~300 м), 3 парковочных места
- способы оплаты (наличные, банк, перевод с карты)
- направления работ: кузов, покраска, вмятины, сварка, металлообработка (токарные/фрезерные), автоэлектрика, стартеры/генераторы, бензиновые двигатели

**Не добавлено** (нет подтверждения): цены, скидки, гарантии, бесплатная диагностика, стаж, сотрудники, Instagram/Telegram, email, акции.

## Перед публикацией — подтвердить у владельца

1. Актуальный график работы
2. Реальные фотографии (сейчас — документальные временные изображения в `public/images/`, легко заменить)
3. Способы оплаты
4. Тексты и формулировки
5. Финальный домен — обновить `metadataBase` в `app/layout.tsx`, URL в `public/sitemap.xml` и `public/robots.txt`

## Проверки качества (выполнены)

- `npm run build` — без ошибок
- горизонтальный overflow — 0 на 320/375/390/768/1024/1440
- мобильное меню: открытие, Escape, выбор пункта, блокировка скролла
- FAQ и lightbox — мышь + клавиатура, закрытие по Escape
- console errors — 0
- Lighthouse: Performance 93 / Accessibility 100 / Best Practices 100 / SEO 100
- контраст WCAG AA (акцентные варианты `accent-strong`/`accent-text`/`accent-bright`)
- страницы 404 и /privacy/ корректны
- все ссылки: tel: / wa.me / 2ГИС проверены
- ESLint (next/core-web-vitals) — 0 ошибок
- skip-link «Перейти к содержимому», PNG-фоллбеки favicon (32 px + Apple 180 px)
- security-заголовки: nosniff, DENY, Referrer-Policy, Permissions-Policy, HSTS
