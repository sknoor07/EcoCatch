import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { createTransporter } from "@/lib/gmail";
import { db } from "@/db";
import { contactReplies, contacts } from "@/db/schema";
import { eq } from "drizzle-orm";

async function auth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: `"EcoCatch Admin" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D5A3D;">Reply from EcoCatch</h2>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="font-size: 12px; color: #86868b;">
            This reply was sent from the EcoCatch admin dashboard.
          </p>
        </div>
      `,
    });

    await db.insert(contactReplies).values({
      contactId: parseInt(id),
      subject: subject,
      message: message,
      sentBy: user.name || "Admin",
    });

    await db
      .update(contacts)
      .set({
        replyMessage: message,
        repliedAt: new Date(),
        isRead: true,
      })
      .where(eq(contacts.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reply error:", err);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}


