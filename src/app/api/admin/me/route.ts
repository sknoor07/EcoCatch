import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/hash";

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get("admin_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    const userRows = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    const user = userRows[0];
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await verifyToken(token);
    const body = await req.json();
    const { name, email, avatar, oldPassword, newPassword } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;

    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json({ error: "Old password required" }, { status: 400 });
      }
      const userRows = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
      const user = userRows[0];
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

      const { comparePassword } = await import("@/lib/hash");
      const valid = await comparePassword(oldPassword, user.password);
      if (!valid) {
        return NextResponse.json({ error: "Incorrect old password" }, { status: 400 });
      }

      updateData.password = await hashPassword(newPassword);
    }

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, payload.userId))
      .returning();

    return NextResponse.json({
      success: true,
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        avatar: result[0].avatar,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
