"use client";

import { useState, useCallback } from "react";
import {
  Bell,
  ChevronDown,
  Search,
  Calendar,
  MapPin,
  Activity,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { DEMO_FACILITIES, DEMO_USERS } from "@/lib/demo-data";
import { formatDateTimeIST } from "@/lib/utils";

const ALERT_NOTIFICATIONS = [
  { id: 1, type: "critical", title: "ICU Bed Capacity at 95%", time: "2m ago", read: false },
  { id: 2, type: "warning", title: "High Claim Denial Rate — Fortis Pune", time: "15m ago", read: false },
  { id: 3, type: "warning", title: "Low Doctor Utilization — Orthopedics", time: "32m ago", read: false },
  { id: 4, type: "info", title: "Stock Expiry Alert — Pharmacy", time: "1h ago", read: true },
  { id: 5, type: "info", title: "47 Lab Reports Pending TAT SLA", time: "2h ago", read: true },
];

interface TopbarProps {
  selectedFacility: string;
  onFacilityChange: (id: string) => void;
  dateRange: string;
  onDateRangeChange: (r: string) => void;
  lastRefresh: Date | null;
  onRefresh: () => void;
}

export function Topbar({
  selectedFacility,
  onFacilityChange,
  dateRange,
  onDateRangeChange,
  lastRefresh,
  onRefresh,
}: TopbarProps) {
  const [showFacilities, setShowFacilities] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFacility =
    selectedFacility === "all"
      ? { shortName: "All Facilities", city: "Enterprise View" }
      : DEMO_FACILITIES.find((f) => f.id === selectedFacility) || DEMO_FACILITIES[0];

  const unreadCount = ALERT_NOTIFICATIONS.filter((n) => !n.read).length;

  const DATE_RANGES = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "This Month",
    "Last Month",
    "This Quarter",
    "This Year",
    "Custom Range",
  ];

  return (
    <header className="header-gradient sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b border-white/10 shadow-lg">
      {/* Logo / App Name */}
      <div className="flex items-center gap-2 mr-2">
        <Activity className="w-5 h-5 text-blue-400" />
        <div className="hidden sm:block">
          <span className="text-white font-bold text-sm">MedOps</span>
          <span className="text-blue-300 text-sm font-medium"> Intelligence</span>
        </div>
      </div>

      <div className="h-6 w-px bg-white/15 hidden md:block" />

      {/* Facility Selector */}
      <div className="relative">
        <button
          onClick={() => {
            setShowFacilities(!showFacilities);
            setShowNotifications(false);
            setShowProfile(false);
            setShowDateRange(false);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white text-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
          <span className="font-medium max-w-32 truncate">{currentFacility.shortName}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {showFacilities && (
          <div className="absolute top-full left-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 w-60 z-50 animate-fade-in">
            <div className="px-3 py-2 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Facility
            </div>
            <button
              onClick={() => { onFacilityChange("all"); setShowFacilities(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-800 transition-colors ${selectedFacility === "all" ? "text-blue-400 font-medium" : "text-slate-300"}`}
            >
              🏢 All Facilities (Enterprise)
            </button>
            {DEMO_FACILITIES.map((f) => (
              <button
                key={f.id}
                onClick={() => { onFacilityChange(f.id); setShowFacilities(false); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-800 transition-colors ${selectedFacility === f.id ? "text-blue-400 font-medium" : "text-slate-300"}`}
              >
                <div className="font-medium">{f.shortName}</div>
                <div className="text-xs text-slate-500">{f.city} · {f.type} · {f.beds} beds</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Range Selector */}
      <div className="relative hidden md:block">
        <button
          onClick={() => {
            setShowDateRange(!showDateRange);
            setShowFacilities(false);
            setShowNotifications(false);
            setShowProfile(false);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white text-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
          <span className="font-medium">{dateRange}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {showDateRange && (
          <div className="absolute top-full left-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 w-44 z-50 animate-fade-in">
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => { onDateRangeChange(r); setShowDateRange(false); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-800 transition-colors ${dateRange === r ? "text-blue-400 font-medium" : "text-slate-300"}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden lg:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-sm">
        <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search patients, doctors, modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
        />
      </div>

      <div className="flex-1" />

      {/* Last Refresh */}
      <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500">
        <button onClick={onRefresh} className="p-1 hover:text-slate-300 transition-colors" title="Refresh data">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <span>Updated {lastRefresh ? formatDateTimeIST(lastRefresh) : "Loading…"}</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
            setShowFacilities(false);
            setShowDateRange(false);
          }}
          className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse-glow">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute top-full right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-80 z-50 animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <span className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Mark all read</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {ALERT_NOTIFICATIONS.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors ${!n.read ? "bg-slate-800/50" : ""}`}>
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === "critical" ? "bg-red-500" : n.type === "warning" ? "bg-amber-500" : "bg-blue-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-200 font-medium leading-tight">{n.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{n.time}</div>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-center">
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all alerts →</button>
            </div>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="relative">
        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
            setShowFacilities(false);
            setShowDateRange(false);
          }}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold">
            RK
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs text-white font-medium leading-tight">Dr. Rajesh Kumar</div>
            <div className="text-xs text-slate-500 leading-tight">Super Admin</div>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400 hidden md:block" />
        </button>

        {showProfile && (
          <div className="absolute top-full right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-52 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-slate-700">
              <div className="text-sm text-white font-medium">Dr. Rajesh Kumar</div>
              <div className="text-xs text-slate-400">superadmin@medgroup.in</div>
              <div className="text-xs text-blue-400 mt-0.5">Super Administrator</div>
            </div>
            {[
              { icon: User, label: "My Profile", href: "/profile" },
              { icon: Settings, label: "Settings", href: "/settings" },
              { icon: HelpCircle, label: "Help & Support", href: "/help" },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <item.icon className="w-4 h-4 text-slate-500" />
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-700">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
