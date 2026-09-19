// Shared constants used by both client and server

export const COOKIE_NAME = "sunak_session";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

// Business contact info — single source of truth
export const BUSINESS = {
  name: "СУНАҚ",
  fullName: "СТО Сунақ",
  phone: "+7 775 337 57 93",
  phoneHref: "tel:+77753375793",
  whatsappNumber: "77753375793",
  whatsappDefaultText:
    "Здравствуйте! Пишу с сайта Сунақ.",
  address: "г. Астана, ул. Озбекали Жанибек, 30Б",
  addressShort: "ул. Озбекали Жанибек, 30Б",
  district: "район Сарайшык, ж/м Юго-Восток, правая сторона",
  city: "Астана",
  schedule: "Ежедневно с 09:00 до 24:00",
  scheduleShort: "09:00—24:00",
  rating: "4.8",
  ratingCount: 150,
  reviewCount: 61,
  coordinates: { lat: 51.140399, lng: 71.493193 },
  gisUrl:
    "https://2gis.kz/astana/firm/70000001062595900?m=71.493193%2C51.140399%2F13.9",
  gisReviewsUrl:
    "https://2gis.kz/astana/firm/70000001062595900/tab/reviews",
} as const;
