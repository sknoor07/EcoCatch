import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getActiveProducts() {
  return await db
    .select()
    .from(products)
    .where(eq(products.isActive, true));
}

export async function getProductBySlug(slug: string) {
  const res = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);
  return res[0] || null;
}