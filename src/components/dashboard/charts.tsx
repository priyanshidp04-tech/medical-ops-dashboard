"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
  ReferenceLine,
} from "recharts";
import { generatePatientVolumeTrend, REVENUE_BY_DEPARTMENT } from "@/lib/demo-data";
import { formatINR, cn } from "@/lib/utils";
import { TrendingUp, BarChart3, Users, Calendar, Activity } from "lucide-react";

// === CUSTOM TOOLTIP ===
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip min-w-32">
      <p className="font-semibold text-slate-300 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="text-white font-medium ml-auto">
            {typeof entry.value === "number" && entry.name?.includes("Revenue")
              ? formatINR(entry.value, true)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// === PATIENT VOLUME TREND ===
export function PatientVolumeTrendChart() {
  const [range, setRange] = useState<"7" | "14" | "30">("30");
  const allData = useMemo(() => generatePatientVolumeTrend(), []);
  const data = useMemo(
    () => allData.slice(-parseInt(range)),
    [allData, range]
  );

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">Patient Volume Trends</h3>
          </div>
          <p className="text-xs text-slate-500">Admissions, discharges & OPD visits</p>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
          {(["7", "14", "30"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md font-medium transition-all",
                range === r
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {r}D
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-3">
        {[
          { label: "Admissions", color: "#2563EB" },
          { label: "Discharges", color: "#16A34A" },
          { label: "OPD", color: "#0891B2" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ background: item.color }} />
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="admissionsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="dischargesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16A34A" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            interval={range === "30" ? 4 : range === "14" ? 2 : 0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="admissions"
            name="Admissions"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#admissionsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#2563EB" }}
          />
          <Area
            type="monotone"
            dataKey="discharges"
            name="Discharges"
            stroke="#16A34A"
            strokeWidth={2}
            fill="url(#dischargesGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#16A34A" }}
          />
          <Line
            type="monotone"
            dataKey="opd"
            name="OPD"
            stroke="#0891B2"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            dot={false}
            activeDot={{ r: 3, fill: "#0891B2" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// === REVENUE BY DEPARTMENT ===
export function RevenueByDepartmentChart() {
  const data = REVENUE_BY_DEPARTMENT.map((d) => ({
    ...d,
    name: d.department.length > 8 ? d.department.substring(0, 8) + "…" : d.department,
    revenueLakh: Math.round(d.revenue / 100000),
    targetLakh: Math.round(d.target / 100000),
  }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">Revenue by Department</h3>
          </div>
          <p className="text-xs text-slate-500">INR (Lakhs) · This Month vs. Target</p>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </button>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${v}L`}
          />
          <Tooltip
            content={({ active, payload, label }: any) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="custom-tooltip">
                  <p className="font-semibold text-slate-300 mb-1">{REVENUE_BY_DEPARTMENT.find(d => d.department.startsWith(label?.replace("…","") || ""))?.department || label}</p>
                  {payload.map((entry: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ background: entry.fill }} />
                      <span className="text-slate-400">{entry.name}:</span>
                      <span className="text-white font-medium">₹{entry.value}L</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Bar dataKey="revenueLakh" name="Revenue" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="targetLakh" name="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// === OPERATIONAL HEALTH GAUGE ===
export function OperationalHealthGauge({ score = 87 }: { score?: number }) {
  const radius = 70;
  const circumference = Math.PI * radius; // Half circle
  const progress = (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 85) return "#16A34A";
    if (s >= 70) return "#2563EB";
    if (s >= 55) return "#D97706";
    return "#DC2626";
  };

  const getStatus = (s: number) => {
    if (s >= 85) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (s >= 70) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    if (s >= 55) return { label: "Fair", color: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50" };
  };

  const color = getColor(score);
  const status = getStatus(score);

  const metrics = [
    { label: "Bed Occ.", value: "87%", dot: "#2563EB" },
    { label: "Staff Util.", value: "79%", dot: "#16A34A" },
    { label: "Rev. Target", value: "112%", dot: "#D97706" },
    { label: "Satisfaction", value: "4.4/5", dot: "#7C3AED" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Activity className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Operational Health</h3>
          <p className="text-xs text-slate-500">Enterprise composite score</p>
        </div>
      </div>

      {/* Gauge */}
      <div className="flex justify-center mb-3">
        <div className="relative">
          <svg width="160" height="90" viewBox="0 0 160 95">
            {/* Track */}
            <path
              d="M 10 90 A 70 70 0 0 1 150 90"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Progress */}
            <path
              d="M 10 90 A 70 70 0 0 1 150 90"
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              style={{ transition: "stroke-dasharray 1s ease-in-out" }}
            />
            {/* Segments markers */}
            {[55, 70, 85].map((seg) => {
              const angle = ((seg / 100) * 180 - 180) * (Math.PI / 180);
              const x = 80 + 70 * Math.cos(angle);
              const y = 90 + 70 * Math.sin(angle);
              return (
                <circle key={seg} cx={x} cy={y} r="2" fill="#fff" />
              );
            })}
            {/* Score text */}
            <text x="80" y="80" textAnchor="middle" fontSize="28" fontWeight="700" fill={color}>
              {score}
            </text>
            <text x="80" y="93" textAnchor="middle" fontSize="10" fill="#94a3b8">
              out of 100
            </text>
          </svg>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex justify-center mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.color}`}>
          ● {status.label}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-2 bg-slate-50 rounded-lg px-2 py-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.dot }} />
            <span className="text-xs text-slate-500 truncate">{m.label}</span>
            <span className="text-xs font-semibold text-slate-700 ml-auto">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
