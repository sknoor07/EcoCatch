import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/product_data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    images: product.image ?? [],
  });
}