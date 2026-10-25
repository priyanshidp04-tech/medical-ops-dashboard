"use client";

import { AI_EXECUTIVE_SUMMARY, AUTOMATION_WORKFLOWS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Clock,
  User,
  Play,
  Pause,
  CheckCircle2,
  Circle,
} from "lucide-react";

// === AI EXECUTIVE SUMMARY ===
export function AIExecutiveSummaryCard() {
  const summary = AI_EXECUTIVE_SUMMARY;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">AI Executive Summary</h3>
              <p className="text-xs text-slate-500">{summary.period} · Powered by MedAI</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {summary.confidence}% confidence
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Headline */}
        <p className="text-sm text-slate-700 leading-relaxed">
          {summary.headline}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2">
          {summary.keyMetrics.map((m, i) => (
            <div key={i} className="bg-slate-50 rounded-xl px-3 py-2">
              <div className="text-xs text-slate-500 mb-0.5">{m.label}</div>
              <div className={cn("text-sm font-bold", m.positive ? "text-green-600" : "text-amber-600")}>
                {m.positive ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : <TrendingDown className="w-3 h-3 inline mr-0.5" />}
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Wins */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Operational Wins</span>
          </div>
          <ul className="space-y-1">
            {summary.wins.map((win, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {win}
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Risk Factors</span>
          </div>
          <ul className="space-y-1">
            {summary.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">AI Recommendations</span>
          </div>
          <ul className="space-y-1.5">
            {summary.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                  {i + 1}
                </span>
                <span className="text-slate-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 pt-1 border-t border-slate-100">
          View Full Report
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// === WORKFLOW AUTOMATION PANEL ===
const STATUS_CONFIG = {
  awaiting_approval: { label: "Awaiting Approval", color: "text-amber-600", bg: "bg-amber-50" },
  in_progress: { label: "In Progress", color: "text-blue-600", bg: "bg-blue-50" },
  completed: { label: "Completed", color: "text-green-600", bg: "bg-green-50" },
  paused: { label: "Paused", color: "text-slate-600", bg: "bg-slate-100" },
};

export function WorkflowAutomationPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
            <Workflow className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Workflow Automation in Action</h3>
            <p className="text-xs text-slate-500">DETECT → ANALYZE → PREDICT → RECOMMEND → ALERT → ASSIGN → EXECUTE → TRACK</p>
          </div>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          Manage All →
        </button>
      </div>

      {/* Workflows */}
      <div className="divide-y divide-slate-50">
        {AUTOMATION_WORKFLOWS.map((wf) => {
          const status = STATUS_CONFIG[wf.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.in_progress;

          return (
            <div key={wf.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors group">
              {/* Row 1: Name + status */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center">
                      <Workflow className="w-3 h-3 text-violet-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{wf.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 ml-7">Trigger: {wf.trigger}</p>
                </div>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", status.bg, status.color)}>
                  {status.label}
                </span>
              </div>

              {/* Step visualization */}
              <div className="flex items-center mb-3 ml-7">
                {wf.steps.map((step, idx) => {
                  const isDone = idx < wf.currentStep;
                  const isCurrent = idx === wf.currentStep;
                  const isPending = idx > wf.currentStep;

                  return (
                    <div key={idx} className="flex items-center flex-1 last:flex-none">
                      <div
                        className={cn(
                          "flex items-center justify-center w-5 h-5 rounded-full border-2 text-[9px] font-bold transition-all duration-300 flex-shrink-0",
                          isDone ? "bg-green-500 border-green-500 text-white" :
                          isCurrent ? "bg-blue-500 border-blue-500 text-white animate-pulse" :
                          "bg-white border-slate-200 text-slate-400"
                        )}
                        title={step}
                      >
                        {isDone ? "✓" : idx + 1}
                      </div>
                      {idx < wf.steps.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 mx-0.5 transition-all duration-700",
                            isDone ? "bg-green-400" : "bg-slate-200"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Labels for current step */}
              <div className="flex items-center gap-3 ml-7 flex-wrap">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <User className="w-3 h-3" />
                  {wf.assignee}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {wf.lastRun}
                </div>
                <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  💰 {wf.impact}
                </div>
                <button className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === QUICK ACTIONS ===
import { QUICK_ACTIONS } from "@/lib/demo-data";
import Link from "next/link";
import {
  UserPlus,
  Calendar,
  BedDouble,
  FileText,
  Shield,
  TestTube,
  BarChart3,
  Bell,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UserPlus,
  Calendar,
  BedDouble,
  FileText,
  Shield,
  TestTube,
  BarChart3,
  Bell,
};

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  teal: "bg-teal-50 text-teal-600 hover:bg-teal-100",
  green: "bg-green-50 text-green-600 hover:bg-green-100",
  amber: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  red: "bg-red-50 text-red-600 hover:bg-red-100",
  indigo: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  orange: "bg-orange-50 text-orange-600 hover:bg-orange-100",
};

export function QuickActionsGrid() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-semibold text-slate-800 text-sm">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {QUICK_ACTIONS.map((action) => {
          const Icon = ICON_MAP[action.icon] || UserPlus;
          const colors = COLOR_MAP[action.color] || COLOR_MAP.blue;

          return (
            <Link
              key={action.id}
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-150 group cursor-pointer",
                colors
              )}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
