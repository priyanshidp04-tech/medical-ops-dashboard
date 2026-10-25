"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ModuleStubPageProps {
  moduleNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  plannedFeatures: string[];
  relatedModules?: { label: string; href: string }[];
}

export function ModuleStubPage({
  moduleNumber,
  title,
  description,
  icon: Icon,
  iconBg,
  plannedFeatures,
  relatedModules = [],
}: ModuleStubPageProps) {
  return (
    <div>
      <div className="p-4 md:p-6 space-y-4 max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-8 text-center">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg", iconBg)}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
              Module {moduleNumber}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-slate-500 max-w-lg mx-auto">{description}</p>
          </div>

          {/* Status Banner */}
          <div className="bg-amber-50 border-y border-amber-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <Construction className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-amber-800">Module Under Active Development</div>
                <div className="text-xs text-amber-600 mt-0.5">
                  This module is part of Phase 3-4 of the implementation roadmap. The architecture,
                  data models, and API contracts are defined. UI implementation is in progress.
                </div>
              </div>
            </div>
          </div>

          {/* Planned Features */}
          <div className="px-6 py-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Planned Features (Phase 3-4)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {plannedFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                  <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Modules */}
          {relatedModules.length > 0 && (
            <div className="px-6 pb-5 border-t border-slate-100 pt-4">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Related Modules</h2>
              <div className="flex flex-wrap gap-2">
                {relatedModules.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    → {m.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
