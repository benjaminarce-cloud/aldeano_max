import type { Metadata } from "next";
import { Fraunces, Work_Sans, Space_Mono } from "next/font/google";
import { RESTAURANT } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-work-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const description =
  "Platos de fuego lento, ingredientes de temporada y las recetas que se cuentan de cocina en cocina. Somos la mezcla de lo rural a lo urbano, en Mexicali, B.C.";

export const metadata: Metadata = {
  title: "Aldeano Restaurante — Mexicali, B.C.",
  description,
  openGraph: {
    title: "Aldeano Restaurante — Mexicali, B.C.",
    description,
    type: "website",
    locale: "es_MX",
    siteName: RESTAURANT.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aldeano Restaurante — Mexicali, B.C.",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${fraunces.variable} ${workSans.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
