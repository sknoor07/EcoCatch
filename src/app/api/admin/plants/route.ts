import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { plants } from "@/db/schema";
import { desc, eq, like, or, and } from "drizzle-orm";
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
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 10;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        like(plants.name, `%${search}%`),
        like(plants.owner, `%${search}%`),
        like(plants.location, `%${search}%`)
      )
    );
  }
  if (status !== "all") {
    conditions.push(eq(plants.status, status));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const data = await db
    .select()
    .from(plants)
    .where(whereClause)
    .orderBy(desc(plants.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: db.$count(plants) })
    .from(plants)
    .where(whereClause);

  const total = countResult[0]?.count || 0;

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: NextRequest) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, owner, location, capacityKw, status } = body;

    if (!name || !owner) {
      return NextResponse.json({ error: "Name and owner are required" }, { status: 400 });
    }

    const result = await db
      .insert(plants)
      .values({
        name,
        owner,
        location: location || null,
        capacityKw: capacityKw ? parseInt(capacityKw) : null,
        status: status || "active",
      })
      .returning();

    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}