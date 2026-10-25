"use client";

import { useState } from "react";
import { cn, formatDate, formatDateTimeIST } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Clock,
  BedDouble,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";


// Synthetic patient data
const SYNTHETIC_PATIENTS = [
  { id: "P-001234", name: "Arjun Mehta", age: 45, gender: "Male", phone: "+91 98765 43210", uhid: "UHID-2024-001234", lastVisit: "2026-10-22", status: "OPD", dept: "Cardiology", doctor: "Dr. Sharma", condition: "Hypertension follow-up", blood: "B+" },
  { id: "P-001235", name: "Priya Nair", age: 32, gender: "Female", phone: "+91 87654 32109", uhid: "UHID-2024-001235", lastVisit: "2026-10-23", status: "Admitted", dept: "Gynecology", doctor: "Dr. Kavitha", condition: "Normal delivery", blood: "O+" },
  { id: "P-001236", name: "Ravi Shankar", age: 68, gender: "Male", phone: "+91 76543 21098", uhid: "UHID-2024-001236", lastVisit: "2026-10-21", status: "ICU", dept: "Cardiology", doctor: "Dr. Suresh", condition: "Post CABG", blood: "A-" },
  { id: "P-001237", name: "Sunita Devi", age: 55, gender: "Female", phone: "+91 65432 10987", uhid: "UHID-2024-001237", lastVisit: "2026-10-20", status: "Discharged", dept: "Orthopedics", doctor: "Dr. Nair", condition: "Hip replacement", blood: "AB+" },
  { id: "P-001238", name: "Mohammed Faruq", age: 28, gender: "Male", phone: "+91 54321 09876", uhid: "UHID-2024-001238", lastVisit: "2026-10-23", status: "Emergency", dept: "Emergency", doctor: "Dr. Reddy", condition: "Road traffic accident", blood: "O-" },
  { id: "P-001239", name: "Lakshmi Pillai", age: 42, gender: "Female", phone: "+91 43210 98765", uhid: "UHID-2024-001239", lastVisit: "2026-10-22", status: "OPD", dept: "Oncology", doctor: "Dr. Gupta", condition: "Chemotherapy session", blood: "B-" },
  { id: "P-001240", name: "Vikram Singh", age: 35, gender: "Male", phone: "+91 32109 87654", uhid: "UHID-2024-001240", lastVisit: "2026-10-23", status: "OPD", dept: "Neurology", doctor: "Dr. Krishnan", condition: "Migraine assessment", blood: "A+" },
  { id: "P-001241", name: "Anita Kumari", age: 60, gender: "Female", phone: "+91 21098 76543", uhid: "UHID-2024-001241", lastVisit: "2026-10-19", status: "Admitted", dept: "Pediatrics", doctor: "Dr. Rao", condition: "Diabetic management", blood: "O+" },
];

const STATUS_COLORS: Record<string, string> = {
  OPD: "bg-blue-100 text-blue-700",
  Admitted: "bg-green-100 text-green-700",
  ICU: "bg-red-100 text-red-700",
  Emergency: "bg-orange-100 text-orange-700",
  Discharged: "bg-slate-100 text-slate-600",
};

const KPI_CARDS = [
  { label: "Total Patients", value: "2,845", change: "+5.2%", positive: true, color: "kpi-blue", icon: Users },
  { label: "OPD Today", value: "580", change: "+12%", positive: true, color: "kpi-teal", icon: Clock },
  { label: "Admitted", value: "174", change: "+3%", positive: true, color: "kpi-green", icon: BedDouble },
  { label: "Emergency", value: "42", change: "-8%", positive: true, color: "kpi-red", icon: AlertCircle },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = SYNTHETIC_PATIENTS.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.uhid.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="p-4 md:p-6 space-y-4 max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Patient Operations</h1>
              <p className="text-xs text-slate-500">Module 2 · Registration, Admissions, Queue, Discharge</p>
            </div>
          </div>
          <Link
            href="/patients/new"
            className="flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2 transition-colors font-medium"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register Patient
          </Link>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {KPI_CARDS.map((card, i) => (
            <div key={card.label} className={cn(card.color, "rounded-xl p-4 text-white relative overflow-hidden")}>
              <div className="flex items-center justify-between mb-2">
                <card.icon className="w-5 h-5 opacity-80" />
                <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded-full bg-white/20")}>
                  {card.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-xs opacity-70 mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-blue-400 transition-colors">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by name, ID, UHID, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-1 flex-wrap">
              {["All", "OPD", "Admitted", "ICU", "Emergency", "Discharged"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "text-xs px-3 py-2 rounded-lg font-medium transition-colors",
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <span className="text-sm text-slate-500">
              Showing <strong className="text-slate-700">{filtered.length}</strong> patients
            </span>
            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>UHID</th>
                  <th>Age / Gender</th>
                  <th>Contact</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Last Visit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient) => (
                  <tr key={patient.id} className="group cursor-pointer">
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 text-sm">{patient.name}</div>
                          <div className="text-xs text-slate-400">{patient.id} · {patient.blood}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {patient.uhid}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-slate-700">{patient.age} yrs / {patient.gender}</span>
                    </td>
                    <td>
                      <div className="text-xs text-slate-600">{patient.phone}</div>
                    </td>
                    <td>
                      <span className="text-sm text-slate-700">{patient.dept}</span>
                    </td>
                    <td>
                      <span className="text-sm text-slate-700">{patient.doctor}</span>
                    </td>
                    <td>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_COLORS[patient.status])}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-500">{patient.lastVisit}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Schedule">
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">Page {page} of 356 (2,845 total patients)</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30"
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, "...", 356].map((p, i) => (
                <button
                  key={i}
                  onClick={() => typeof p === "number" && setPage(p)}
                  className={cn(
                    "w-7 h-7 rounded-lg text-xs transition-colors",
                    page === p ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
