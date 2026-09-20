import { ProductHero } from "./_components/product-hero";
import { ProductGrid } from "./_components/product-grid";
import { EquipmentShowcase } from "./_components/equipment-showcase";
import { Footer } from "@/components/footer";
import { Metadata } from "next";
import { getActiveProducts } from "@/lib/product_data";

export const metadata: Metadata = {
  title: "Products & Equipment | EcoCatch",
  description: "Explore EcoCatch's range of biogas equipment: DODA pumps, separators, mixers, AMAG RETI odorizing systems, and end-to-end EPC solutions.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "EcoCatch Products & Equipment",
    description: "Explore our range of biogas equipment imported from Italy, UK, US, and Northern Ireland.",
    images: [{ url: "/social_share/og-products.png", width: 1200, height: 630, alt: "EcoCatch Products & Equipment" }],
  },
};

export default async function ProductPage() {
  const allProducts = await getActiveProducts();
  const solutions = allProducts.filter(p => p.productType === "solution");
  const equipment = allProducts.filter(p => p.productType === "equipment");
  return (
    <>
      <ProductHero />
      <ProductGrid products={solutions} />
      <EquipmentShowcase categories={equipment} />
      <Footer />
    </>
  );
}