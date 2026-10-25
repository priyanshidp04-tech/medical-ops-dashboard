"use client";
import { ModuleStubPage } from "@/components/module-stub";
import { Settings } from "lucide-react";

export default function Page() {
  return (
    <ModuleStubPage
      moduleNumber={13}
      title="Patient Experience"
      description="Feedback management, complaints, NPS, CSAT, sentiment analysis, and service quality tracking."
      icon={Settings}
      iconBg="bg-gradient-to-br from-blue-600 to-indigo-700"
      plannedFeatures={[
        "Interactive data tables with search, filter, sort, and pagination",
        "Module-specific KPI cards with drill-down capability",
        "Form workflows with validation, save, and confirmation states",
        "Integration with backend analytics API and real-time data",
        "Export to PDF/Excel with filtered data",
        "Alert and notification integration",
        "Role-based access control and permission checks",
        "Audit trail for all create/update/delete operations",
      ]}
      relatedModules={[
        { label: "Executive Dashboard", href: "/dashboard" },
        { label: "AI Copilot", href: "/copilot" },
        { label: "Workflow Automation", href: "/automation" },
      ]}
    />
  );
}
