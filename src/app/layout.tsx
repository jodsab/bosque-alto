import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import { images } from "@/shared/constants/images.constants";
import FloatingCta from "@/features/nav/FloatingCta";
import MetaPixel from "@/shared/components/MetaPixel";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "800"],
});

const siteUrl = process.env.SITE_URL || "https://inmobiliariaproyectainnova.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: content.meta.title,
    description: content.meta.ogDescription,
    url: siteUrl,
    siteName: content.brand.fullName,
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: images.heroBackground,
        width: 1200,
        height: 630,
        alt: content.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.ogDescription,
    images: [images.heroBackground],
  },
};

export const viewport: Viewport = {
  themeColor: content.meta.themeColor,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: content.brand.fullName,
  image: `${siteUrl}${images.logoProyecta}`,
  url: siteUrl,
  telephone: `+${contact.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Arequipa 1860, piso 19, Of. 1905",
    addressLocality: "Lince",
    addressRegion: "Lima",
    addressCountry: "PE",
  },
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#lotes"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-brand-dark focus:px-4 focus:py-2 focus:text-text-on-dark"
        >
          {content.nav.skipLink}
        </a>
        {children}
        <FloatingCta whatsappHref={contact.whatsappHref} phoneHref={`tel:+${contact.whatsappNumber}`} />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        )}
      </body>
    </html>
  );
}
