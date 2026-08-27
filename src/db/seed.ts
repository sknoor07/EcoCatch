import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";
import { hashPassword } from "@/lib/hash";

async function seed() {
  const email = "admin@ecocatch.in";
  const password = "EcoCatch@2026";
  const name = "Yugal Roy";

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    console.log("Admin user already exists");
    process.exit(0);
  }

  const hashed = await hashPassword(password);
  await db.insert(users).values({ email, password: hashed, name, role: "admin" });

  console.log("✅ Admin created:");
  console.log("   Email:", email);
  console.log("   Password:", password);
  process.exit(0);
}

// Need eq import
import { eq } from "drizzle-orm";
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});