import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { sendContactEmail } from "@/lib/gmail";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const result = await db
      .insert(contacts)
      .values({
        name,
        email,
        phone: phone || null,
        message,
      })
      .returning();

    // Send email notification
    try {
      await sendContactEmail({ name, email, phone, message });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Don't fail the request if email fails — still return success
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted successfully",
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}