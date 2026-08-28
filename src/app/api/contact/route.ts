import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts, products } from "@/db/schema";
import { sendContactEmail } from "@/lib/gmail";
import { and, eq, inArray } from "drizzle-orm";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    const rawSelectedProductIds: unknown = body.selectedProductIds;
    const selectedProductIds = Array.isArray(rawSelectedProductIds)
      ? [...new Set(rawSelectedProductIds.filter((id): id is number => typeof id === "number" && Number.isInteger(id)))]
      : [];

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

    if (selectedProductIds.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one product." },
        { status: 400 }
      );
    }

    const selectedRows = await db
      .select({ id: products.id, name: products.name, shortName: products.shortName })
      .from(products)
      .where(and(eq(products.isActive, true), inArray(products.id, selectedProductIds)));

    if (selectedRows.length !== selectedProductIds.length) {
      return NextResponse.json(
        { error: "One or more selected products are no longer available. Please refresh and try again." },
        { status: 400 }
      );
    }

    const selectedProducts = selectedProductIds.map((id) => {
      const product = selectedRows.find((row) => row.id === id)!;
      return { id: product.id, name: product.shortName || product.name };
    });

    // Save to database
    const result = await db
      .insert(contacts)
      .values({
        name,
        email,
        phone: phone || null,
        message,
        selectedProducts,
      })
      .returning();

    // Send email notification
    try {
      await sendContactEmail({ name, email, phone, message, selectedProducts });
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
