import { AboutHero } from "./_components/about-hero";
import { OriginStory } from "./_components/origin-story";
import { Timeline } from "./_components/timeline";
import { FounderProfile } from "./_components/founder-profile";
import { EquipmentPartners } from "./_components/equipment-partners";
import { WorkshopSection } from "./_components/workshop-section";
import { ClientsTrust } from "./_components/clients-trust";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | EcoCatch Energy Solutions",
  description: "Founded in 2016, EcoCatch is a Mumbai-based team of engineers transforming organic waste into clean energy. Learn about our journey and our founder Yugal Roy.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About EcoCatch",
    description: "Founded in 2016, EcoCatch is a Mumbai-based team of engineers transforming organic waste into clean energy.",
    images: [{ url: "/social_share/og-about.png", width: 1200, height: 630, alt: "About EcoCatch" }],
  },
};


export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <Timeline />
      <FounderProfile />
      <EquipmentPartners />
      <WorkshopSection />
      <ClientsTrust />
      <Footer />
    </>
  );
}