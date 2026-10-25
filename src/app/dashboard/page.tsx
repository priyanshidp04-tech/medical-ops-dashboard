"use client";

import { useState } from "react";
import { KPIGrid } from "@/components/dashboard/kpi-grid";
import {
  PatientVolumeTrendChart,
  RevenueByDepartmentChart,
  OperationalHealthGauge,
} from "@/components/dashboard/charts";
import { FacilityComparisonTable } from "@/components/dashboard/facility-table";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import {
  AIExecutiveSummaryCard,
  WorkflowAutomationPanel,
  QuickActionsGrid,
} from "@/components/dashboard/insight-panels";
import { DEPARTMENT_PERFORMANCE } from "@/lib/demo-data";
import { formatINR, cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Download,
  Share2,
  RefreshCw,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  Activity,
} from "lucide-react";

// === DEPARTMENT PERFORMANCE TABLE ===
function DepartmentPerformanceTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center">
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">Department Performance</h3>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          Full Analytics →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Patients</th>
              <th>Revenue</th>
              <th>Satisfaction</th>
              <th>Utilization</th>
              <th>Avg Wait</th>
            </tr>
          </thead>
          <tbody>
            {DEPARTMENT_PERFORMANCE.map((dept) => (
              <tr key={dept.dept} className="group cursor-pointer">
                <td>
                  <span className="font-medium text-slate-800">{dept.dept}</span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{dept.patients.toLocaleString("en-IN")}</span>
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  </div>
                </td>
                <td>
                  <span className="font-semibold text-slate-800">{formatINR(dept.revenue, true)}</span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">{"★".repeat(Math.round(dept.satisfaction))}</span>
                    <span className="text-xs text-slate-500">{dept.satisfaction}/5</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-12">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${dept.utilization}%`,
                          background: dept.utilization > 90 ? "#DC2626" : dept.utilization > 75 ? "#2563EB" : "#D97706",
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 w-8">{dept.utilization}%</span>
                  </div>
                </td>
                <td>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      dept.waitTime > 30 ? "text-red-600" : dept.waitTime > 20 ? "text-amber-600" : "text-green-600"
                    )}
                  >
                    {dept.waitTime} min
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === KPI DETAIL MODAL ===
function KPIDrillDownModal({ kpiKey, onClose }: { kpiKey: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-slate-800 mb-2">KPI Drill-Down</h2>
        <p className="text-sm text-slate-600 mb-4">
          Detailed analysis for <strong>{kpiKey}</strong> — Click outside to close.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
          📊 This would show a detailed breakdown chart, trend analysis, and drill-down to facility/department level.
          Full implementation connects to the backend analytics API.
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// === MAIN DASHBOARD PAGE ===
export default function ExecutiveDashboardPage() {
  const [drillDownKPI, setDrillDownKPI] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsRefreshing(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1920px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">Executive Command Center</h1>
            <p className="text-xs text-slate-500">MedGroup India · Enterprise View · All Facilities</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button className="flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* === ROW 1: KPI CARDS === */}
      <KPIGrid onDrillDown={(key) => setDrillDownKPI(key)} />

      {/* === ROW 2: CHARTS + HEALTH GAUGE === */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1">
          <PatientVolumeTrendChart />
        </div>
        <div className="xl:col-span-1">
          <RevenueByDepartmentChart />
        </div>
        <div className="xl:col-span-1">
          <OperationalHealthGauge score={87} />
        </div>
      </div>

      {/* === ROW 3: FACILITY TABLE + AI SUMMARY === */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <FacilityComparisonTable />
        </div>
        <div className="xl:col-span-1">
          <AIExecutiveSummaryCard />
        </div>
      </div>

      {/* === ROW 4: QUICK ACTIONS === */}
      <QuickActionsGrid />

      {/* === ROW 5: ALERTS + DEPARTMENT PERFORMANCE === */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AlertsPanel />
        <DepartmentPerformanceTable />
      </div>

      {/* === ROW 6: WORKFLOW AUTOMATION === */}
      <WorkflowAutomationPanel />

      {/* Footer */}
      <div className="text-center py-4 text-xs text-slate-400">
        <span>MedOps Intelligence Platform · Demo Mode · Synthetic Data Only · </span>
        <span className="font-medium">Not for clinical, financial, or legal use</span>
        <span> · Last updated: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</span>
      </div>

      {/* KPI Drill-Down Modal */}
      {drillDownKPI && (
        <KPIDrillDownModal kpiKey={drillDownKPI} onClose={() => setDrillDownKPI(null)} />
      )}
    </div>
  );
}
