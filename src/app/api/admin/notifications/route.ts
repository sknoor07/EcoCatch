import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { eq, count } from "drizzle-orm";
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

  try{
  const result = await db
    .select({ value: count() })
    .from(contacts)
    .where(eq(contacts.isRead, false));

  return NextResponse.json({ unreadCount: result[0]?.value || 0 });
}catch (error) {
    console.error("Notifications API error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}