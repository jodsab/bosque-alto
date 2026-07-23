import type { Metadata } from "next";
import content from "@/shared/constants/content.json";
import SiteHeader from "@/features/nav/SiteHeader";
import PrivacidadSection from "@/features/legal/PrivacidadSection";
import SiteFooter from "@/features/footer/SiteFooter";

export const metadata: Metadata = {
  title: `${content.privacidad.title} | ${content.brand.name}`,
  description: content.privacidad.intro,
};

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PrivacidadSection />
      </main>
      <SiteFooter />
    </>
  );
}