import { NextRequest, NextResponse } from "next/server";
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

const mockMachines = [
  { id: 1, plantId: 1, name: "Main Digester Mixer", type: "agitation" },
  { id: 2, plantId: 1, name: "Gas Holder Dome", type: "storage" },
  { id: 3, plantId: 1, name: "Inlet Chopper Pump", type: "pumping" },
  { id: 4, plantId: 1, name: "Outlet Slurry Pump", type: "pumping" },
  { id: 5, plantId: 1, name: "Pressure Monitor", type: "sensor" },
  { id: 6, plantId: 1, name: "Temperature Sensor Array", type: "sensor" },
];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await auth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const machines = mockMachines.filter((m) => m.plantId === parseInt(id));
  return NextResponse.json({ data: machines.length ? machines : mockMachines });
}