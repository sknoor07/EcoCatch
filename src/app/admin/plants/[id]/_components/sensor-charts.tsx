"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import api from "@/db/api-client";

type Range = "hourly" | "daily" | "weekly" | "monthly";

const ranges: { key: Range; label: string }[] = [
  { key: "hourly", label: "Hourly" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export function SensorCharts({ plantId }: { plantId: string }) {
  const [range, setRange] = useState<Range>("hourly");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/plants/${plantId}/sensors`, {
          params: { range },
        });
        setData(res.data.data);
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [plantId, range]);

  return (
    <div className="space-y-4">
      {/* Range Tabs */}
      <div className="flex items-center gap-2">
        {ranges.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              range === r.key
                ? "bg-[#2D5A3D] text-white dark:bg-[#4ADE80] dark:text-[#0A0A0A]"
                : "bg-white dark:bg-[#111] text-[#86868b] border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#86868b]" />
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Temperature Chart */}
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Temperature (°C)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A0D" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#86868b" }} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#86868b" }}
                  domain={["dataMin - 2", "dataMax + 2"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0A0A",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#E5E5E5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#EA580C"
                  fill="url(#tempGradient)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pressure Chart */}
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Pressure (bar)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A0D" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#86868b" }} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#86868b" }}
                  domain={["dataMin - 0.2", "dataMax + 0.2"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0A0A",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#E5E5E5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pressure"
                  stroke="#0EA5E9"
                  fill="url(#pressureGradient)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Flow Rate Chart */}
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Flow Rate (m³/h)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A0D" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#86868b" }} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#86868b" }}
                  domain={["dataMin - 5", "dataMax + 5"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0A0A",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#E5E5E5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="flowRate"
                  stroke="#4ADE80"
                  fill="url(#flowGradient)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}