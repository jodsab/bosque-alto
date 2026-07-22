import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import FloatingCta from "@/features/nav/FloatingCta";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "800"],
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
        className={`${jakarta.variable} font-body bg-cream-bg text-text-dark antialiased`}
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
