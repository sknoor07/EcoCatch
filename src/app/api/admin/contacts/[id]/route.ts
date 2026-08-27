import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactReplies, contacts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const contactId = parseInt(id);
  const data = await db.select().from(contacts).where(eq(contacts.id, contactId)).limit(1);
  if (!data[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const replies = await db
    .select()
    .from(contactReplies)
    .where(eq(contactReplies.contactId, contactId))
    .orderBy(desc(contactReplies.createdAt));

  return NextResponse.json({ data: { ...data[0], replies } });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const result = await db
    .update(contacts)
    .set({
      isRead: body.isRead,
      isImportant: body.isImportant,
    })
    .where(eq(contacts.id, parseInt(id)))
    .returning();

  return NextResponse.json({ data: result[0] });
}


