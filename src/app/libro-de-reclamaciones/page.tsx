import type { Metadata } from "next";
import content from "@/shared/constants/content.json";
import SiteHeader from "@/features/nav/SiteHeader";
import LibroReclamacionesSection from "@/features/legal/LibroReclamacionesSection";
import SiteFooter from "@/features/footer/SiteFooter";

export const metadata: Metadata = {
  title: `${content.libroReclamaciones.title} | ${content.brand.name}`,
  description: content.libroReclamaciones.intro,
};

export default function LibroReclamacionesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LibroReclamacionesSection />
      </main>
      <SiteFooter />
    </>
  );
}