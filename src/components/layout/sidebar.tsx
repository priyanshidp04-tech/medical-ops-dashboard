"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CreditCard,
  Shield,
  Code2,
  Brain,
  Workflow,
  Pill,
  FlaskConical,
  Ambulance,
  CheckSquare,
  Heart,
  Truck,
  DollarSign,
  Bot,
  BarChart3,
  Lock,
  Plug,
  ChevronDown,
  ChevronRight,
  Activity,
  Building2,
  Menu,
  X,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Core",
    items: [
      {
        id: 1,
        label: "Executive Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        badge: null,
        color: "text-blue-400",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        id: 2,
        label: "Patient Operations",
        icon: Users,
        href: "/patients",
        badge: "2,845",
        color: "text-cyan-400",
      },
      {
        id: 3,
        label: "Doctor & Staff",
        icon: Stethoscope,
        href: "/staff",
        badge: null,
        color: "text-teal-400",
      },
      {
        id: 11,
        label: "Emergency & Critical",
        icon: Ambulance,
        href: "/emergency",
        badge: "⚠️ 3",
        color: "text-red-400",
      },
    ],
  },
  {
    label: "Revenue",
    items: [
      {
        id: 4,
        label: "Billing & Revenue",
        icon: CreditCard,
        href: "/billing",
        badge: null,
        color: "text-amber-400",
      },
      {
        id: 5,
        label: "Insurance & Claims",
        icon: Shield,
        href: "/claims",
        badge: "23",
        color: "text-orange-400",
      },
      {
        id: 6,
        label: "Medical Coding",
        icon: Code2,
        href: "/coding",
        badge: null,
        color: "text-yellow-400",
      },
      {
        id: 15,
        label: "Financial Intelligence",
        icon: DollarSign,
        href: "/finance",
        badge: null,
        color: "text-green-400",
      },
    ],
  },
  {
    label: "Clinical",
    items: [
      {
        id: 9,
        label: "Pharmacy & Inventory",
        icon: Pill,
        href: "/pharmacy",
        badge: "⚠️",
        color: "text-pink-400",
      },
      {
        id: 10,
        label: "Laboratory",
        icon: FlaskConical,
        href: "/laboratory",
        badge: "47",
        color: "text-violet-400",
      },
    ],
  },
  {
    label: "Quality",
    items: [
      {
        id: 12,
        label: "Quality & Compliance",
        icon: CheckSquare,
        href: "/quality",
        badge: null,
        color: "text-emerald-400",
      },
      {
        id: 13,
        label: "Patient Experience",
        icon: Heart,
        href: "/experience",
        badge: null,
        color: "text-rose-400",
      },
    ],
  },
  {
    label: "Procurement",
    items: [
      {
        id: 14,
        label: "Supply Chain & Vendors",
        icon: Truck,
        href: "/supply-chain",
        badge: null,
        color: "text-indigo-400",
      },
    ],
  },
  {
    label: "AI & Automation",
    items: [
      {
        id: 7,
        label: "AI Predictive Analytics",
        icon: Brain,
        href: "/ai-analytics",
        badge: null,
        color: "text-purple-400",
      },
      {
        id: 8,
        label: "Workflow Automation",
        icon: Workflow,
        href: "/automation",
        badge: "3 active",
        color: "text-blue-300",
      },
      {
        id: 16,
        label: "AI Copilot",
        icon: Bot,
        href: "/copilot",
        badge: null,
        color: "text-sky-400",
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        id: 17,
        label: "Advanced Analytics",
        icon: BarChart3,
        href: "/analytics",
        badge: null,
        color: "text-cyan-300",
      },
      {
        id: 18,
        label: "Security & Governance",
        icon: Lock,
        href: "/security",
        badge: null,
        color: "text-slate-400",
      },
      {
        id: 19,
        label: "Integrations",
        icon: Plug,
        href: "/integrations",
        badge: "4 connected",
        color: "text-lime-400",
      },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (v: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = useCallback((label: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

  return (
    <aside
      className={cn(
        "sidebar-gradient flex flex-col h-screen sticky top-0 transition-all duration-300 z-40 sidebar-scroll overflow-y-auto",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <Activity className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm leading-tight">MedOps</div>
            <div className="text-blue-300 text-xs font-medium leading-tight">Intelligence</div>
          </div>
        )}
        <button
          onClick={() => onCollapse?.(!collapsed)}
          className="ml-auto text-slate-400 hover:text-white transition-colors p-1 rounded"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Facility indicator */}
      {!collapsed && (
        <div className="px-4 py-2 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Apollo Mumbai</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 ml-auto flex-shrink-0 animate-pulse" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2">
        {NAV_GROUPS.map((group) => {
          const isGroupCollapsed = collapsedGroups[group.label];
          return (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
                >
                  {group.label}
                  {isGroupCollapsed ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}

              {!isGroupCollapsed &&
                group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 mb-0.5 cursor-pointer group",
                        isActive
                          ? "active bg-blue-600/25 text-white border-r-2 border-blue-400"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          "flex-shrink-0 transition-colors",
                          collapsed ? "w-5 h-5" : "w-4 h-4",
                          isActive ? "text-blue-300" : item.color
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium truncate">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="flex-shrink-0 text-xs bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute left-10 top-0 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </nav>

      {/* Bottom user section */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white font-medium truncate">Dr. Rajesh Kumar</div>
              <div className="text-xs text-slate-500 truncate">Super Admin</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
