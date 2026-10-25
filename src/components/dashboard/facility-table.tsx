"use client";

import { useState } from "react";
import { FACILITY_COMPARISON } from "@/lib/demo-data";
import { formatINR, cn } from "@/lib/utils";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ExternalLink,
  Star,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type SortKey = "bedOccupancy" | "avgStay" | "revenue" | "staffUtilization" | "patientSatisfaction" | "claimDenialRate";

const STATUS_ICONS = {
  excellent: <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />,
  good: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
  critical: <AlertTriangle className="w-3.5 h-3.5 text-red-600" />,
};

const STATUS_LABELS = {
  excellent: { label: "Excellent", class: "status-excellent" },
  good: { label: "Good", class: "status-good" },
  warning: { label: "Warning", class: "status-warning" },
  critical: { label: "Critical", class: "status-critical" },
};

function ProgressBar({ value, max = 100, color = "#2563EB" }: { value: number; max?: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-medium text-slate-600 w-8 text-right">{value}%</span>
    </div>
  );
}

export function FacilityComparisonTable() {
  const [sortKey, setSortKey] = useState<SortKey>("bedOccupancy");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...FACILITY_COMPARISON].sort((a, b) => {
    const va = a[sortKey] as number;
    const vb = b[sortKey] as number;
    return sortDir === "desc" ? vb - va : va - vb;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const columns: { key: SortKey; label: string; width?: string }[] = [
    { key: "bedOccupancy", label: "Bed Occ.", width: "w-28" },
    { key: "avgStay", label: "Avg Stay", width: "w-20" },
    { key: "revenue", label: "Revenue", width: "w-28" },
    { key: "staffUtilization", label: "Staff Util.", width: "w-28" },
    { key: "patientSatisfaction", label: "Satisfaction", width: "w-24" },
    { key: "claimDenialRate", label: "Denial Rate", width: "w-24" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Facility Performance Comparison</h3>
            <p className="text-xs text-slate-500">Click column headers to sort</p>
          </div>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          Full Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="text-left">Facility</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn("cursor-pointer hover:text-slate-700 transition-colors select-none", col.width)}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={cn("w-3 h-3", sortKey === col.key ? "text-blue-500" : "text-slate-300")} />
                  </div>
                </th>
              ))}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((facility, index) => {
              const statusInfo = STATUS_LABELS[facility.status as keyof typeof STATUS_LABELS];
              const icon = STATUS_ICONS[facility.status as keyof typeof STATUS_ICONS];

              return (
                <tr key={facility.id} className="group">
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{facility.facility}</div>
                        <div className="text-xs text-slate-400">#{index + 1} overall</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ProgressBar
                      value={facility.bedOccupancy}
                      color={facility.bedOccupancy > 90 ? "#DC2626" : facility.bedOccupancy > 80 ? "#D97706" : "#16A34A"}
                    />
                  </td>
                  <td>
                    <span className="text-slate-700 font-medium">{facility.avgStay} days</span>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{formatINR(facility.revenue, true)}</div>
                      <div className="flex items-center gap-0.5 text-xs text-green-600">
                        <TrendingUp className="w-2.5 h-2.5" />
                        +8.2%
                      </div>
                    </div>
                  </td>
                  <td>
                    <ProgressBar
                      value={facility.staffUtilization}
                      color={facility.staffUtilization < 70 ? "#DC2626" : "#2563EB"}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-slate-700">{facility.patientSatisfaction}</span>
                      <span className="text-slate-400 text-xs">/5</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        facility.claimDenialRate > 7 ? "text-red-600" : facility.claimDenialRate > 5 ? "text-amber-600" : "text-green-600"
                      )}
                    >
                      {facility.claimDenialRate}%
                    </span>
                  </td>
                  <td>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusInfo.class)}>
                      {statusInfo.label}
                    </span>
                  </td>
                  <td>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      View →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
