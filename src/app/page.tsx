import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ImpactSection } from "@/components/impact-section";
import { TestimonialMarquee } from "@/components/testimonial-marquee";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BiogasPlant3D } from "@/components/biogas-plant-3d"; // <-- Standard import now
import { Metadata } from "next";
import { getActiveProducts } from "@/lib/product_data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const products = await getActiveProducts();
  return (
    <>
      <HeroSection />

      <ScrollReveal>
        <BiogasPlant3D />
      </ScrollReveal>

      <ServicesSection />

      <ImpactSection />

      <ScrollReveal>
        <TestimonialMarquee />
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection products={products} />
      </ScrollReveal>

      <Footer />
    </>
  );
}
