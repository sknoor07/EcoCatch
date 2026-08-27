import { notFound } from "next/navigation";
// <-- IMPORT

import { ProductSidebar } from "../_components/product-sidebar";
import { Footer } from "@/components/footer";

import { ProductDetail } from "../_components/product-detail";
import { getActiveProducts, getProductBySlug } from "@/lib/product_data";
import { Product } from "@/types/admin";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug); // <-- FETCH FROM DB
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — EcoCatch Products`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getActiveProducts(); // <-- FETCH FROM DB
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug); // <-- FETCH TARGET FROM DB

  if (!product) return notFound();

  const allProducts = await getActiveProducts();

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0A0A0A] pt-28 pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <ProductSidebar activeSlug={slug} allProducts={allProducts} />
              </div>
            </aside>
            <main>
              <ProductDetail product={product as Product} />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}