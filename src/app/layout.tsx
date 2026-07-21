import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import FloatingCta from "@/features/nav/FloatingCta";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.ogDescription,
    locale: "es_PE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: content.meta.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE">
      <body
        className={`${display.variable} ${body.variable} font-body bg-cream-bg text-text-dark antialiased`}
      >
        <a
          href="#lotes"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-brand-dark focus:px-4 focus:py-2 focus:text-text-on-dark"
        >
          {content.nav.skipLink}
        </a>
        {children}
        <FloatingCta whatsappHref={contact.whatsappHref} phoneHref={`tel:+${contact.whatsappNumber}`} />
      </body>
    </html>
  );
}
