import type { Metadata } from "next";
import content from "@/shared/constants/content.json";
import SiteHeader from "@/features/nav/SiteHeader";
import TerminosSection from "@/features/legal/TerminosSection";
import SiteFooter from "@/features/footer/SiteFooter";

export const metadata: Metadata = {
  title: `${content.terminos.title} | ${content.brand.name}`,
  description: content.terminos.sections[0]?.body,
};

export default function TerminosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <TerminosSection />
      </main>
      <SiteFooter />
    </>
  );
}