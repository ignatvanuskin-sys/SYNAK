import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { company } from "@/lib/company-data";
import "./globals.css";

const heading = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://sunak-sto.kz";
const title = "СТО «Сунақ» в Астане | Кузовной ремонт, сварка, автоэлектрика";
const description =
  "СТО «Сунақ» в Астане на улице Озбекали Жанибек, 30Б. Кузовной ремонт, покраска, ремонт вмятин, сварка, металлообработка, автоэлектрика, стартеры, генераторы и бензиновые двигатели. Ежедневно 09:00-24:00 по данным 2ГИС.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Сунақ — СТО в Астане",
    title,
    description:
      "СТО «Сунақ» в Астане. Кузовной ремонт, покраска, ремонт вмятин, сварка, металлообработка, автоэлектрика и ремонт бензиновых двигателей. Ежедневно 09:00-24:00 по данным 2ГИС.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "СТО «Сунақ» в Астане — обычный городской автосервис",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "СТО «Сунақ» в Астане на улице Озбекали Жанибек, 30Б. Кузовной ремонт, сварка, автоэлектрика, двигатель. Ежедневно 09:00-24:00 по данным 2ГИС.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F4F0",
};

const autoRepairSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: company.name,
  telephone: company.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Озбекали Жанибек, 30Б",
    addressLocality: "Астана",
    addressCountry: "KZ",
  },
  areaServed: {
    "@type": "City",
    name: "Астана",
  },
  openingHours: company.hours.spec,
  hasMap: company.links.card,
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable}`}>
      <body className="bg-surface font-body text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(autoRepairSchema),
          }}
        />
      </body>
    </html>
  );
}
