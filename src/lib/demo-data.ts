// ============================================================
// SYNTHETIC DEMO DATA FOR MEDICAL OPS INTELLIGENCE DASHBOARD
// All data is fictional and for demonstration purposes only.
// INR currency, Indian healthcare context.
// ============================================================

export const DEMO_ORGANIZATION = {
  id: "org-001",
  name: "MedGroup India Pvt. Ltd.",
  tagline: "Smarter Data | Healthier Operations | Better Patient Outcomes",
  logo: "🏥",
  country: "India",
  currency: "INR",
  timezone: "Asia/Kolkata",
};

export const DEMO_FACILITIES = [
  {
    id: "fac-001",
    name: "Apollo Multispecialty Hospital",
    shortName: "Apollo Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Hospital",
    beds: 450,
    departments: 22,
    active: true,
  },
  {
    id: "fac-002",
    name: "Fortis Medical Centre",
    shortName: "Fortis Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "Hospital",
    beds: 280,
    departments: 16,
    active: true,
  },
  {
    id: "fac-003",
    name: "Manipal Clinic",
    shortName: "Manipal Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Clinic",
    beds: 120,
    departments: 10,
    active: true,
  },
  {
    id: "fac-004",
    name: "Ruby Hall Diagnostics",
    shortName: "Ruby Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "Diagnostics",
    beds: 60,
    departments: 8,
    active: true,
  },
];

export const DEMO_USERS = [
  {
    id: "usr-001",
    name: "Dr. Rajesh Kumar",
    email: "superadmin@medgroup.in",
    role: "Super Administrator",
    facility: "All Facilities",
    avatar: "RK",
    department: "Administration",
  },
  {
    id: "usr-002",
    name: "Dr. Priya Sharma",
    email: "director@apollo.in",
    role: "Hospital Director",
    facility: "Apollo Mumbai",
    avatar: "PS",
    department: "Administration",
  },
  {
    id: "usr-003",
    name: "Mr. Arun Mehta",
    email: "manager@fortis.in",
    role: "Branch Manager",
    facility: "Fortis Pune",
    avatar: "AM",
    department: "Operations",
  },
];

// === KPI DATA ===
export const EXECUTIVE_KPIS = {
  totalPatients: {
    label: "Total Patients",
    value: 2845,
    previousValue: 2704,
    unit: "patients",
    period: "This Month",
    trend: "up",
    growth: 5.2,
    color: "blue",
    icon: "Users",
  },
  admissions: {
    label: "Admissions",
    value: 142,
    previousValue: 131,
    unit: "today",
    period: "Today",
    trend: "up",
    growth: 8.4,
    color: "teal",
    icon: "UserPlus",
  },
  discharges: {
    label: "Discharges",
    value: 118,
    previousValue: 124,
    unit: "today",
    period: "Today",
    trend: "down",
    growth: -4.8,
    color: "green",
    icon: "UserCheck",
  },
  revenue: {
    label: "Revenue",
    value: 18500000,
    previousValue: 16450000,
    unit: "INR",
    period: "This Month",
    trend: "up",
    growth: 12.5,
    color: "amber",
    icon: "IndianRupee",
  },
  bedOccupancy: {
    label: "Bed Occupancy",
    value: 87,
    previousValue: 84,
    unit: "%",
    period: "Current",
    trend: "up",
    growth: 3.6,
    color: "purple",
    icon: "BedDouble",
  },
  operationalHealth: {
    label: "Op. Health Score",
    value: 87,
    previousValue: 82,
    unit: "/100",
    period: "Current",
    trend: "up",
    growth: 6.1,
    color: "emerald",
    icon: "Activity",
    status: "Good",
  },
};

// === PATIENT VOLUME TREND (Last 30 days) ===
export function generatePatientVolumeTrend() {
  const data = [];
  const base = new Date("2026-09-23");
  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseAdmissions = isWeekend ? 95 : 140;
    const baseDischarges = isWeekend ? 88 : 125;
    data.push({
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      admissions: baseAdmissions + Math.floor(Math.random() * 30) - 10,
      discharges: baseDischarges + Math.floor(Math.random() * 25) - 8,
      opd: 280 + Math.floor(Math.random() * 80) - 20,
    });
  }
  return data;
}

// === REVENUE BY DEPARTMENT ===
export const REVENUE_BY_DEPARTMENT = [
  { department: "Cardiology", revenue: 4500000, target: 4200000, color: "#2563EB" },
  { department: "Orthopedics", revenue: 3800000, target: 3500000, color: "#0891B2" },
  { department: "Emergency", revenue: 2600000, target: 2800000, color: "#DC2626" },
  { department: "Pediatrics", revenue: 1900000, target: 2100000, color: "#D97706" },
  { department: "Neurology", revenue: 2200000, target: 2000000, color: "#7C3AED" },
  { department: "Oncology", revenue: 3200000, target: 3000000, color: "#16A34A" },
  { department: "Gynecology", revenue: 1600000, target: 1800000, color: "#EC4899" },
  { department: "Radiology", revenue: 1400000, target: 1500000, color: "#F59E0B" },
];

// === FACILITY COMPARISON ===
export const FACILITY_COMPARISON = [
  {
    id: "fac-001",
    facility: "Apollo Mumbai",
    bedOccupancy: 93.5,
    avgStay: 4.2,
    revenue: 9200000,
    staffUtilization: 88,
    patientSatisfaction: 4.6,
    claimDenialRate: 3.2,
    status: "excellent",
  },
  {
    id: "fac-002",
    facility: "Fortis Pune",
    bedOccupancy: 81.2,
    avgStay: 3.8,
    revenue: 5600000,
    staffUtilization: 79,
    patientSatisfaction: 4.3,
    claimDenialRate: 5.1,
    status: "good",
  },
  {
    id: "fac-003",
    facility: "Manipal Bengaluru",
    bedOccupancy: 74.8,
    avgStay: 2.9,
    revenue: 2400000,
    staffUtilization: 72,
    patientSatisfaction: 4.1,
    claimDenialRate: 6.8,
    status: "warning",
  },
  {
    id: "fac-004",
    facility: "Ruby Hyderabad",
    bedOccupancy: 68.3,
    avgStay: 1.2,
    revenue: 1300000,
    staffUtilization: 65,
    patientSatisfaction: 3.9,
    claimDenialRate: 8.4,
    status: "critical",
  },
];

// === ALERTS ===
export const DEMO_ALERTS = [
  {
    id: "alert-001",
    type: "critical",
    title: "ICU Bed Capacity at 95%",
    description: "Apollo Mumbai ICU has only 2 beds remaining. Immediate action required.",
    facility: "Apollo Mumbai",
    department: "ICU",
    time: "2 mins ago",
    assignee: "Dr. Priya Sharma",
    actionLabel: "View Beds",
  },
  {
    id: "alert-002",
    type: "warning",
    title: "High Claim Denial Rate",
    description: "Fortis Pune insurance claim denial rate reached 8.2% — above 5% threshold.",
    facility: "Fortis Pune",
    department: "Billing",
    time: "15 mins ago",
    assignee: "Mr. Arun Mehta",
    actionLabel: "Review Claims",
  },
  {
    id: "alert-003",
    type: "warning",
    title: "Doctor Utilization Below Target",
    description: "4 doctors in Orthopedics have less than 60% appointment utilization today.",
    facility: "Apollo Mumbai",
    department: "Orthopedics",
    time: "32 mins ago",
    assignee: "Dr. Rajesh Kumar",
    actionLabel: "View Schedule",
  },
  {
    id: "alert-004",
    type: "info",
    title: "Stock Expiry Alert",
    description: "18 medicine batches expire within 30 days. Review purchase orders.",
    facility: "Manipal Bengaluru",
    department: "Pharmacy",
    time: "1 hr ago",
    assignee: "Pharmacist Team",
    actionLabel: "View Inventory",
  },
  {
    id: "alert-005",
    type: "info",
    title: "Pending Lab Reports",
    description: "47 lab reports pending beyond 4-hour TAT SLA.",
    facility: "Ruby Hyderabad",
    department: "Laboratory",
    time: "2 hrs ago",
    assignee: "Lab Manager",
    actionLabel: "View Labs",
  },
];

// === AI EXECUTIVE SUMMARY ===
export const AI_EXECUTIVE_SUMMARY = {
  generatedAt: new Date().toISOString(),
  period: "October 2026",
  headline:
    "Operations performing above target this month. Revenue up 12.5% driven by Cardiology and Oncology departments. Bed occupancy at 87% enterprise-wide — Apollo Mumbai nearing capacity.",
  keyMetrics: [
    { label: "Revenue vs. Budget", value: "+12.5%", positive: true },
    { label: "Patient Volume", value: "+5.2%", positive: true },
    { label: "Avg. Wait Time", value: "28 min", positive: false },
    { label: "Claim Denial Rate", value: "3.2%", positive: true },
  ],
  wins: [
    "Apollo Mumbai achieved 93.5% bed occupancy — highest in network",
    "Cardiology revenue exceeded target by ₹3L this month",
    "Patient satisfaction score improved to 4.4/5 network-wide",
  ],
  risks: [
    "Ruby Hyderabad showing declining KPIs — intervention needed",
    "ICU capacity at Apollo Mumbai critical — contingency plan required",
    "4 doctors with low utilization impacting Orthopedics revenue",
  ],
  recommendations: [
    "Optimize doctor schedules in Orthopedics to fill 40+ open appointment slots",
    "Initiate bed expansion plan for Apollo Mumbai ICU",
    "Launch claim-denial reduction workflow for Fortis Pune billing team",
  ],
  confidence: 94,
};

// === WORKFLOW AUTOMATION ===
export const AUTOMATION_WORKFLOWS = [
  {
    id: "wf-001",
    name: "Low Doctor Utilization Alert",
    trigger: "Doctor utilization < 60%",
    steps: ["Detect low utilization", "Analyze schedule gaps", "Recommend optimization", "Alert manager", "Await approval", "Assign task", "Track outcome"],
    currentStep: 4,
    status: "awaiting_approval",
    assignee: "Dr. Rajesh Kumar",
    lastRun: "35 mins ago",
    impact: "Revenue recovery: ~₹1.2L",
  },
  {
    id: "wf-002",
    name: "Claim Denial Follow-Up",
    trigger: "Claim denied by insurer",
    steps: ["Detect denial", "Identify reason", "Gather documents", "Assign officer", "Submit appeal", "Track status"],
    currentStep: 3,
    status: "in_progress",
    assignee: "Claims Team",
    lastRun: "12 mins ago",
    impact: "Recovery: ₹4.8L pending",
  },
  {
    id: "wf-003",
    name: "Stock Expiry Management",
    trigger: "Medicine expiry < 30 days",
    steps: ["Detect expiry risk", "Calculate consumption", "Generate PO", "Approve PO", "Notify vendor"],
    currentStep: 2,
    status: "in_progress",
    assignee: "Pharmacy Team",
    lastRun: "1 hr ago",
    impact: "Wastage prevention: ₹85K",
  },
];

// === DEPARTMENT PERFORMANCE (for heatmap/table) ===
export const DEPARTMENT_PERFORMANCE = [
  { dept: "Cardiology", patients: 312, revenue: 4500000, satisfaction: 4.6, utilization: 92, waitTime: 22 },
  { dept: "Orthopedics", patients: 248, revenue: 3800000, satisfaction: 4.3, utilization: 68, waitTime: 35 },
  { dept: "Emergency", patients: 892, revenue: 2600000, satisfaction: 4.0, utilization: 95, waitTime: 18 },
  { dept: "Pediatrics", patients: 276, revenue: 1900000, satisfaction: 4.7, utilization: 74, waitTime: 28 },
  { dept: "Neurology", patients: 198, revenue: 2200000, satisfaction: 4.4, utilization: 81, waitTime: 24 },
  { dept: "Oncology", patients: 165, revenue: 3200000, satisfaction: 4.5, utilization: 88, waitTime: 20 },
  { dept: "Gynecology", patients: 221, revenue: 1600000, satisfaction: 4.8, utilization: 76, waitTime: 15 },
  { dept: "Radiology", patients: 533, revenue: 1400000, satisfaction: 4.2, utilization: 85, waitTime: 12 },
];

// === PATIENT FLOW (Sankey-style) ===
export const PATIENT_FLOW = {
  opd: 580,
  emergency: 142,
  referred: 48,
  admittedFromOpd: 98,
  admittedFromEmergency: 44,
  directAdmit: 32,
  icu: 28,
  surgery: 62,
  generalWard: 84,
  discharged: 118,
  transferred: 12,
};

// === COPILOT CONVERSATION HISTORY ===
export const INITIAL_COPILOT_MESSAGES = [
  {
    id: "msg-001",
    role: "assistant",
    content:
      "👋 Hello! I'm **MedAI Copilot**, your AI-powered healthcare operations assistant.\n\nI can help you analyze KPIs, identify trends, forecast demand, and recommend actions — all grounded in your real operational data.\n\n**What would you like to explore today?**",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    sources: [],
  },
];

export const COPILOT_SUGGESTED_QUESTIONS = [
  "What caused revenue to decrease this month?",
  "Which department has the highest operational delays?",
  "Show doctors with low utilization",
  "Which claims are likely to be denied?",
  "How many beds will we need next week?",
  "Generate today's hospital operations report",
  "Compare branch performance this quarter",
  "What are the top 5 operational risks?",
];

// === COPILOT CANNED RESPONSES ===
export const COPILOT_RESPONSES: Record<string, { content: string; chart?: string }> = {
  revenue: {
    content:
      "📊 **Revenue Analysis — October 2026**\n\nOverall revenue is **up 12.5%** (₹1.85 Cr vs ₹1.64 Cr last month). Key drivers:\n\n• **Cardiology** +18% — New surgical procedures\n• **Oncology** +15% — Increased chemotherapy sessions\n• **Orthopedics** -3% — 4 doctors with low utilization\n\n⚠️ **Concern**: Orthopedics is ₹2.3L below monthly target due to underutilized appointment slots.\n\n**Recommended Action**: Review and optimize Orthopedics schedules to recover ~₹1.2L in potential revenue.",
    chart: "revenue",
  },
  delays: {
    content:
      "⏱️ **Operational Delay Analysis**\n\nDepartments with highest average wait times:\n\n1. **Orthopedics** — 35 min avg (target: 20 min)\n2. **Pediatrics** — 28 min avg\n3. **Neurology** — 24 min avg\n4. **Cardiology** — 22 min avg\n\n**Root Cause (Orthopedics)**: 3 doctors running 40+ min over schedule on average consultations.\n\n**AI Recommendation**: Enable buffer slots between complex consultations and alert doctors at 30-min intervals.",
    chart: "waittime",
  },
  doctors: {
    content:
      "👨‍⚕️ **Low Utilization Doctors — Today**\n\n| Doctor | Specialty | Booked | Utilization |\n|--------|-----------|--------|-------------|\n| Dr. Suresh Nair | Orthopedics | 6/12 | 50% |\n| Dr. Meena Iyer | Orthopedics | 7/12 | 58% |\n| Dr. Amit Joshi | Neurology | 8/14 | 57% |\n| Dr. Kavita Rao | Gynecology | 9/14 | 64% |\n\n**Estimated Revenue Impact**: ₹1.4L in unrealized appointment revenue today.\n\n**Action Available**: Trigger 'Schedule Optimization Workflow' to fill open slots via patient SMS reminders?",
  },
  claims: {
    content:
      "🔍 **Claim Denial Risk Prediction**\n\nAI model identified **23 claims** at high denial risk (>70% probability):\n\n• **Missing pre-authorization**: 8 claims (United Healthcare)\n• **Coding mismatch**: 7 claims (Star Health)\n• **Incomplete documentation**: 8 claims (HDFC Ergo)\n\n**Total Amount at Risk**: ₹6.8L\n\n**Model Accuracy**: 87% (based on last 6 months)\n⚠️ *These are AI predictions — review with claims officer before action.*\n\n**Recommended**: Assign claims team to review flagged cases before EOD.",
  },
  beds: {
    content:
      "🛏️ **Bed Demand Forecast — Next 7 Days**\n\nForecast (based on admission trends + seasonal patterns):\n\n| Date | Predicted Admissions | Beds Needed | Buffer |\n|------|---------------------|-------------|--------|\n| Oct 24 | 148 | 312 | 138 |\n| Oct 25 | 152 | 318 | 132 |\n| Oct 26 | 128 | 290 | 160 |\n| Oct 27 | 119 | 278 | 172 |\n| Oct 28 | 156 | 325 | 125 |\n\n⚠️ **Oct 25 & 28**: Predicted demand within 95% of Apollo Mumbai capacity.\n\n**Confidence**: 82% | *Forecast intervals: ±15 admissions*\n\n**Recommendation**: Pre-arrange 20 overflow beds at Fortis Pune for Oct 25 and Oct 28.",
  },
  report: {
    content:
      "📋 **Daily Hospital Operations Report — Oct 23, 2026**\n\n**Network Overview**\n• Total Patients Today: 2,845 (+5.2%)\n• Admissions: 142 | Discharges: 118\n• Revenue (MTD): ₹1.85 Cr (+12.5%)\n• Bed Occupancy: 87% | Op. Health Score: 87/100\n\n**Key Highlights**\n✅ Cardiology exceeding revenue targets\n✅ Patient satisfaction at 4.4/5\n⚠️ ICU capacity at Apollo Mumbai: 95%\n⚠️ 47 lab reports beyond TAT SLA\n\n**Actions Required**\n1. Orthopedics schedule optimization — Revenue impact ₹1.2L\n2. ICU contingency plan needed at Apollo Mumbai\n3. Claim denial review: 23 high-risk claims (₹6.8L)\n\n*Report generated by MedAI Copilot | Data as of 21:45 IST*\n*[Download PDF Report]*",
  },
};

// === QUICK ACTIONS ===
export const QUICK_ACTIONS = [
  { id: "qa-001", label: "New Patient", icon: "UserPlus", href: "/patients/new", color: "blue" },
  { id: "qa-002", label: "Schedule Appointment", icon: "Calendar", href: "/appointments/new", color: "teal" },
  { id: "qa-003", label: "Admit Patient", icon: "BedDouble", href: "/admissions/new", color: "green" },
  { id: "qa-004", label: "New Invoice", icon: "FileText", href: "/billing/new", color: "amber" },
  { id: "qa-005", label: "Submit Claim", icon: "Shield", href: "/claims/new", color: "purple" },
  { id: "qa-006", label: "Lab Order", icon: "TestTube", href: "/lab/new", color: "red" },
  { id: "qa-007", label: "Reports", icon: "BarChart3", href: "/reports", color: "indigo" },
  { id: "qa-008", label: "Alerts", icon: "Bell", href: "/alerts", color: "orange" },
];
