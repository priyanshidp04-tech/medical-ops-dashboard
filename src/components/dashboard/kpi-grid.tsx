"use client";

import { cn, formatINR, formatNumber } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  UserCheck,
  IndianRupee,
  BedDouble,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { EXECUTIVE_KPIS } from "@/lib/demo-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  UserPlus,
  UserCheck,
  IndianRupee,
  BedDouble,
  Activity,
};

interface KPICardProps {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  period: string;
  trend: "up" | "down";
  growth: number;
  color: string;
  icon: string;
  status?: string;
  onClick?: () => void;
  animationDelay?: number;
}

function KPICard({
  label,
  value,
  unit,
  period,
  trend,
  growth,
  color,
  icon,
  status,
  onClick,
  animationDelay = 0,
}: KPICardProps) {
  const Icon = ICON_MAP[icon] || Activity;
  const isPositive = trend === "up";
  const isRevenue = unit === "INR";
  const isPercent = unit === "%" || unit === "/100";

  const displayValue = isRevenue
    ? formatINR(value, true)
    : isPercent
    ? `${value}${unit}`
    : formatNumber(value);

  // Mini sparkline data
  const sparkPoints = [40, 55, 45, 60, 52, 68, 58, 72, 65, 80].map(
    (v, i) => `${i * 10},${100 - v}`
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        `kpi-${color}`,
        "relative rounded-2xl p-4 cursor-pointer group overflow-hidden shadow-lg",
        "hover:scale-[1.02] hover:shadow-xl transition-all duration-200",
        "animate-fade-in-up opacity-0"
      )}
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "forwards" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/30" />
        <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <div className="text-white font-bold text-2xl leading-none">
              {displayValue}
            </div>
            {status && (
              <div className="text-white/80 text-xs mt-0.5 font-medium">{status}</div>
            )}
          </div>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Sparkline */}
        <div className="mb-2 opacity-60">
          <svg viewBox="0 -10 100 100" className="w-full h-8" preserveAspectRatio="none">
            <polyline
              points={sparkPoints.join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">{period}</span>
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
              isPositive
                ? "bg-white/20 text-white"
                : "bg-black/20 text-white/80"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(growth)}%
          </div>
        </div>
      </div>
    </div>
  );
}

interface KPIGridProps {
  onDrillDown?: (kpiKey: string) => void;
}

export function KPIGrid({ onDrillDown }: KPIGridProps) {
  const kpis = Object.entries(EXECUTIVE_KPIS);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map(([key, kpi], index) => (
        <KPICard
          key={key}
          {...kpi}
          animationDelay={index * 80}
          onClick={() => onDrillDown?.(key)}
        />
      ))}
    </div>
  );
}
