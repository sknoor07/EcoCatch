import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

async function auth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";

  let query = db.select().from(contacts).orderBy(desc(contacts.createdAt));

  // We need to handle filtering properly with Drizzle
  const allContacts = await query;
  
  let filtered = allContacts;
  if (filter === "unread") filtered = allContacts.filter((c) => !c.isRead);
  if (filter === "important") filtered = allContacts.filter((c) => c.isImportant);

  return NextResponse.json({ data: filtered });
}
