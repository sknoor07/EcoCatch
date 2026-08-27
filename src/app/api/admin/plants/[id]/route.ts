import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { plants } from "@/db/schema";
import { eq } from "drizzle-orm";
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
  const data = await db.select().from(plants).where(eq(plants.id, parseInt(id))).limit(1);
  if (!data[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: data[0] });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, owner, location, capacityKw, status } = body;

    const result = await db
      .update(plants)
      .set({
        name,
        owner,
        location: location || null,
        capacityKw: capacityKw ? parseInt(capacityKw) : null,
        status,
      })
      .where(eq(plants.id, parseInt(id)))
      .returning();

    if (!result[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: result[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(plants).where(eq(plants.id, parseInt(id)));
  return NextResponse.json({ success: true });
}