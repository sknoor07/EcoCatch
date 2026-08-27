// import "dotenv/config";
// import { db } from "./index";
// import { products } from "./schema";
// import { products as coreSolutions, productCategories } from "../lib/products-data";
// import { eq } from "drizzle-orm";

// async function seedProducts() {
//   console.log("Starting product migration to database...");

//   // 1. Seed Core Solutions
//   for (const product of coreSolutions) {
//     const existing = await db.select().from(products).where(eq(products.slug, product.slug));
//     if (existing.length > 0) {
//       console.log(`⏭️  Skipping: ${product.name}`);
//       continue;
//     }

//     await db.insert(products).values({
//       slug: product.slug,
//       name: product.name,
//       shortName: product.shortName,
//       tagline: product.tagline,
//       description: product.description,
//       longDescription: product.longDescription || null,
//       productType: "solution", // <--- Tagged as Core Solution
//       features: product.features || [],
//       specs: product.specs || null,
//       applications: product.applications || null,
//       brand: product.brand || null,
//       brandOrigin: product.brandOrigin || null,
//       category: product.category,
//       isActive: true,
//     });
//     console.log(`✅ Migrated Core Solution: ${product.name}`);
//   }

//   // 2. Seed Equipment Categories
//   for (const equipment of productCategories) {
//     const existing = await db.select().from(products).where(eq(products.slug, equipment.slug));
//     if (existing.length > 0) {
//       console.log(`⏭️  Skipping: ${equipment.name}`);
//       continue;
//     }

//     await db.insert(products).values({
//       slug: equipment.slug,
//       name: equipment.name,
//       shortName: equipment.shortName,
//       tagline: equipment.tagline,
//       description: equipment.description,
//       longDescription: equipment.longDescription || null,
//       productType: "equipment", // <--- Tagged as Equipment
//       features: equipment.features || [],
//       specs: equipment.specs || null,
//       applications: equipment.applications || null,
//       brand: equipment.brand || null,
//       brandOrigin: equipment.brandOrigin || null,
//       category: equipment.category,
//       isActive: true,
//     });
//     console.log(`✅ Migrated Equipment: ${equipment.name}`);
//   }

//   console.log("🎉 Database migration complete!");
//   process.exit(0);
// }

// seedProducts().catch((e) => {
//   console.error("Migration failed:", e);
//   process.exit(1);
// });