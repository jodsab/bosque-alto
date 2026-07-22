import SiteHeader from "@/features/nav/SiteHeader";
import Hero from "@/features/hero/Hero";
import LotesSection from "@/features/lotes/LotesSection";
import AmenidadesSection from "@/features/lotes/AmenidadesSection";
import SliderSection from "@/features/carrousel/SliderSection";
import PlusvaliaSection from "@/features/plusvalia/PlusvaliaSection";
import UbicacionSection from "@/features/ubicacion/UbicacionSection";
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
        <FacilidadesPagoSection />
        <TestimoniosSection />
        <FaqSection />
        <CotizacionFinalSection />
      </main>
      <SiteFooter />
    </>
  );
}
