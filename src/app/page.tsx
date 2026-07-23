import SiteHeader from "@/features/nav/SiteHeader";
import Hero from "@/features/hero/Hero";
import LotesSection from "@/features/lotes/LotesSection";
import AmenidadesSection from "@/features/lotes/AmenidadesSection";
import SliderSection from "@/features/carrousel/SliderSection";
import PlusvaliaSection from "@/features/plusvalia/PlusvaliaSection";
import UbicacionSection from "@/features/ubicacion/UbicacionSection";
import Render3DSection from "@/features/ubicacion/Render3DSection";
import Tour360Section from "@/features/ubicacion/Tour360Section";
import FacilidadesPagoSection from "@/features/facilidades-pago/FacilidadesPagoSection";
import TestimoniosSection from "@/features/testimonios/TestimoniosSection";
import FaqSection from "@/features/faq/FaqSection";
import CotizacionFinalSection from "@/features/cotizacion/CotizacionFinalSection";
import SiteFooter from "@/features/footer/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LotesSection />
        <AmenidadesSection />
        <SliderSection />
        <PlusvaliaSection />
        <UbicacionSection />
        <Render3DSection />
        <Tour360Section />
        <FacilidadesPagoSection />
        <TestimoniosSection />
        <FaqSection />
        <CotizacionFinalSection />
      </main>
      <SiteFooter />
    </>
  );
}