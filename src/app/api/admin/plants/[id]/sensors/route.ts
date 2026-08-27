import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { subHours, subDays, subWeeks, subMonths, format } from "date-fns";

async function auth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

function generateMockData(range: string) {
  const now = new Date();
  const data: { time: string; temperature: number; pressure: number; flowRate: number }[] = [];

  let points = 24;
  let intervalFn: (date: Date, amount: number) => Date = subHours;
  let formatStr = "HH:mm";

  if (range === "daily") {
    points = 30;
    intervalFn = subDays;
    formatStr = "dd MMM";
  } else if (range === "weekly") {
    points = 12;
    intervalFn = subWeeks;
    formatStr = "'Week' w";
  } else if (range === "monthly") {
    points = 12;
    intervalFn = subMonths;
    formatStr = "MMM yyyy";
  }

  for (let i = points - 1; i >= 0; i--) {
    const date = intervalFn(now, i);
    data.push({
      time: format(date, formatStr),
      temperature: 38 + Math.random() * 12, // 38-50°C
      pressure: 0.8 + Math.random() * 1.4, // 0.8-2.2 bar
      flowRate: 20 + Math.random() * 60, // 20-80 m³/h
    });
  }

  return data;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "hourly";

  const data = generateMockData(range);
  return NextResponse.json({ data, range });
}