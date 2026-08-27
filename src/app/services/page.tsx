
import { Footer } from "@/components/footer";
import { ServiceHero } from "./_components/service-hero";
import { AmagHighlight } from "./_components/amag-highlight";
import { ProcessFlow } from "./_components/process-flow";
import { EquipmentGallery } from "./_components/equipment-gallery";
import { SolutionQuiz } from "./_components/solution-quiz";
import { ServiceCards } from "./_components/service-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | BioGAS, Water Treatment, Energy Audit & EPC",
  description: "End-to-end biogas plant EPC, water treatment (STP/ETP), energy audits, solid waste management, and Italian AMAG RETI odorizing systems. Pan-India service.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "EcoCatch Services",
    description: "End-to-end biogas plant EPC, water treatment (STP/ETP), energy audits, and solid waste management.",
    url: "https://ecocatch.in/services",
    images: [{ url: "/og-services.jpg", width: 1200, height: 630 }],
  },
};



export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceCards />
      <AmagHighlight />
      <ProcessFlow />
      <EquipmentGallery />
      <SolutionQuiz />
      <Footer />
    </>
  );
}