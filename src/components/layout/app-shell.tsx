"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { CopilotPanel } from "@/components/copilot/copilot-panel";
import { cn } from "@/lib/utils";
import { Bot, ChevronLeft, ChevronRight } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState("all");
  const [dateRange, setDateRange] = useState("This Month");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Initialize on client only — avoids Next.js prerender error with new Date()
  useEffect(() => {
    setLastRefresh(new Date());
  }, []);

  const handleRefresh = useCallback(() => {
    setLastRefresh(new Date());
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* DEMO BANNER */}
      <div className="demo-banner fixed top-0 left-0 right-0 z-50">
        🏥 DEMO MODE — Synthetic Indian healthcare data · MedGroup India Pvt. Ltd. · Not for clinical use
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex w-full h-full pt-[28px]">
        {/* SIDEBAR */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar
            selectedFacility={selectedFacility}
            onFacilityChange={setSelectedFacility}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            lastRefresh={lastRefresh}
            onRefresh={handleRefresh}
          />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* COPILOT TOGGLE */}
        <button
          onClick={() => setCopilotOpen(!copilotOpen)}
          className={cn(
            "fixed top-1/2 -translate-y-1/2 z-40 bg-blue-600 text-white p-1.5 rounded-l-lg shadow-lg hover:bg-blue-700 transition-all duration-200",
            copilotOpen ? "right-80" : "right-0"
          )}
          title={copilotOpen ? "Close AI Copilot" : "Open AI Copilot"}
        >
          {copilotOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </button>

        {/* COPILOT PANEL */}
        <div
          className={cn(
            "flex-shrink-0 transition-all duration-300 overflow-hidden copilot-panel",
            copilotOpen ? "w-80" : "w-0"
          )}
        >
          {copilotOpen && <CopilotPanel onClose={() => setCopilotOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
