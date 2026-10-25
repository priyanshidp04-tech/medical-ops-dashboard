"use client";

import { useState } from "react";
import { DEMO_ALERTS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";

const ALERT_ICONS = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const ALERT_COLORS = {
  critical: {
    bg: "bg-red-50",
    border: "border-l-red-500",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  success: {
    bg: "bg-green-50",
    border: "border-l-green-500",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

export function AlertsPanel() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const visibleAlerts = DEMO_ALERTS.filter(
    (a) => !dismissed.has(a.id) && (filter === "all" || a.type === filter)
  );

  const criticalCount = DEMO_ALERTS.filter((a) => a.type === "critical").length;
  const warningCount = DEMO_ALERTS.filter((a) => a.type === "warning").length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-red-600" />
            </div>
            {criticalCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">{criticalCount}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Upcoming Alerts & Exceptions</h3>
            <p className="text-xs text-slate-500">
              {criticalCount} critical · {warningCount} warnings
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
          {(["all", "critical", "warning", "info"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md font-medium capitalize transition-all",
                filter === f
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-600"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="divide-y divide-slate-50">
        {visibleAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle className="w-10 h-10 text-green-300 mb-2" />
            <p className="text-sm text-slate-500 font-medium">No active alerts</p>
            <p className="text-xs text-slate-400">Operations are running smoothly</p>
          </div>
        ) : (
          visibleAlerts.map((alert) => {
            const colors = ALERT_COLORS[alert.type as keyof typeof ALERT_COLORS] || ALERT_COLORS.info;
            const Icon = ALERT_ICONS[alert.type as keyof typeof ALERT_ICONS] || Info;

            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 px-5 py-3.5 border-l-4 group hover:bg-slate-50/50 transition-colors",
                  colors.border,
                  "animate-fade-in"
                )}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", colors.icon)} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{alert.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{alert.description}</p>
                    </div>
                    <button
                      onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
                      className="text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 p-0.5"
                      aria-label="Dismiss alert"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs text-slate-400">{alert.time}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                      {alert.facility}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      {alert.department}
                    </span>
                    <span className="text-slate-200">·</span>
                    <span className="text-xs text-slate-400">{alert.assignee}</span>
                    <button className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {alert.actionLabel}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {visibleAlerts.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">{visibleAlerts.length} active alerts</span>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
}
