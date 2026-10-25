"""
Module 9: Pharmacy & Inventory — FastAPI Router
Medical Operations Intelligence Dashboard

Drop this file into your project and register it in main.py:
    from module9_pharmacy.router import router as pharmacy_router
    app.include_router(pharmacy_router)
"""

from __future__ import annotations

import random
from datetime import date, datetime, timedelta
from typing import Any, Literal, Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Router setup
# ---------------------------------------------------------------------------

router = APIRouter(
    prefix="/api/v1/pharmacy",
    tags=["Pharmacy & Inventory"],
    responses={404: {"description": "Resource not found"}},
)

# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------


class DrugItem(BaseModel):
    drug_id: str
    name: str
    generic_name: str
    category: str
    unit: str
    stock_qty: int
    reorder_level: int
    expiry_date: str
    supplier: str
    unit_cost: float
    status: Literal["OK", "Low Stock", "Critical", "Expired"]


class RestockRequest(BaseModel):
    drug_id: str = Field(..., example="DRG-0042")
    quantity: int = Field(..., gt=0, le=10_000, example=500)
    requested_by: str = Field(..., example="Dr. Aisha Patel")
    urgency: Literal["Routine", "Urgent", "Emergency"] = "Routine"
    notes: Optional[str] = Field(default=None, max_length=500)


class RestockResponse(BaseModel):
    order_id: str
    drug_id: str
    drug_name: str
    quantity: int
    estimated_delivery: str
    urgency: str
    status: str
    raised_at: str


class ConsumptionSummary(BaseModel):
    period: str
    drug_name: str
    units_dispensed: int
    department: str
    avg_daily_consumption: float


class ExpiryAlert(BaseModel):
    drug_id: str
    drug_name: str
    batch_number: str
    expiry_date: str
    days_to_expiry: int
    qty_at_risk: int
    ward: str
    severity: Literal["Warning", "Critical", "Expired"]


# ---------------------------------------------------------------------------
# Mock data
# ---------------------------------------------------------------------------

_SUPPLIERS = [
    "MedLine Pharma", "Sun Pharma Ltd", "Cipla Generics",
    "Dr. Reddy's", "Abbott Healthcare", "Novartis India",
]

_DRUGS: list[dict[str, Any]] = [
    {"drug_id": "DRG-0001", "name": "Augmentin 625mg",    "generic_name": "Amoxicillin/Clavulanate", "category": "Antibiotics",      "unit": "Strip",   "stock_qty": 1200, "reorder_level": 300, "expiry_date": "2026-08-15", "supplier": "MedLine Pharma",   "unit_cost": 8.50,    "status": "OK"},
    {"drug_id": "DRG-0002", "name": "Crocin 500mg",       "generic_name": "Paracetamol",              "category": "Analgesics",        "unit": "Strip",   "stock_qty": 85,   "reorder_level": 200, "expiry_date": "2027-03-20", "supplier": "Sun Pharma Ltd",   "unit_cost": 2.10,    "status": "Low Stock"},
    {"drug_id": "DRG-0003", "name": "Amlodipine 5mg",     "generic_name": "Amlodipine Besylate",      "category": "Antihypertensives", "unit": "Strip",   "stock_qty": 40,   "reorder_level": 150, "expiry_date": "2025-12-01", "supplier": "Cipla Generics",   "unit_cost": 3.75,    "status": "Critical"},
    {"drug_id": "DRG-0004", "name": "Metformin 500mg",    "generic_name": "Metformin HCl",            "category": "Antidiabetics",     "unit": "Strip",   "stock_qty": 980,  "reorder_level": 250, "expiry_date": "2027-06-30", "supplier": "Dr. Reddy's",      "unit_cost": 1.80,    "status": "OK"},
    {"drug_id": "DRG-0005", "name": "Warfarin 5mg",       "generic_name": "Warfarin Sodium",          "category": "Anticoagulants",    "unit": "Strip",   "stock_qty": 320,  "reorder_level": 100, "expiry_date": "2026-11-10", "supplier": "Abbott Healthcare","unit_cost": 5.60,    "status": "OK"},
    {"drug_id": "DRG-0006", "name": "Dexamethasone 4mg",  "generic_name": "Dexamethasone",            "category": "Corticosteroids",   "unit": "Vial",    "stock_qty": 15,   "reorder_level": 50,  "expiry_date": "2025-10-20", "supplier": "Novartis India",   "unit_cost": 22.00,   "status": "Critical"},
    {"drug_id": "DRG-0007", "name": "Remdesivir 100mg",   "generic_name": "Remdesivir",               "category": "Antivirals",        "unit": "Vial",    "stock_qty": 60,   "reorder_level": 30,  "expiry_date": "2026-05-15", "supplier": "Cipla Generics",   "unit_cost": 4500.00, "status": "OK"},
    {"drug_id": "DRG-0008", "name": "Salbutamol Inhaler", "generic_name": "Salbutamol",               "category": "Bronchodilators",   "unit": "Inhaler", "stock_qty": 220,  "reorder_level": 80,  "expiry_date": "2026-09-01", "supplier": "Sun Pharma Ltd",   "unit_cost": 65.00,   "status": "OK"},
    {"drug_id": "DRG-0009", "name": "Phenytoin 100mg",    "generic_name": "Phenytoin Sodium",         "category": "Antiepileptics",    "unit": "Strip",   "stock_qty": 10,   "reorder_level": 75,  "expiry_date": "2025-09-30", "supplier": "MedLine Pharma",   "unit_cost": 7.20,    "status": "Expired"},
    {"drug_id": "DRG-0010", "name": "Carboplatin 150mg",  "generic_name": "Carboplatin",              "category": "Oncology",          "unit": "Vial",    "stock_qty": 8,    "reorder_level": 10,  "expiry_date": "2026-12-31", "supplier": "Dr. Reddy's",      "unit_cost": 1200.00, "status": "Low Stock"},
    {"drug_id": "DRG-0011", "name": "Ciprofloxacin 500mg","generic_name": "Ciprofloxacin HCl",        "category": "Antibiotics",       "unit": "Strip",   "stock_qty": 750,  "reorder_level": 200, "expiry_date": "2027-01-15", "supplier": "Abbott Healthcare","unit_cost": 4.90,    "status": "OK"},
    {"drug_id": "DRG-0012", "name": "Ibuprofen 400mg",    "generic_name": "Ibuprofen",                "category": "Analgesics",        "unit": "Strip",   "stock_qty": 1500, "reorder_level": 300, "expiry_date": "2027-04-25", "supplier": "Cipla Generics",   "unit_cost": 1.95,    "status": "OK"},
    {"drug_id": "DRG-0013", "name": "Lisinopril 10mg",    "generic_name": "Lisinopril",               "category": "Antihypertensives", "unit": "Strip",   "stock_qty": 290,  "reorder_level": 150, "expiry_date": "2026-10-10", "supplier": "Novartis India",   "unit_cost": 3.30,    "status": "OK"},
    {"drug_id": "DRG-0014", "name": "Insulin Glargine",   "generic_name": "Insulin Glargine",         "category": "Antidiabetics",     "unit": "Pen",     "stock_qty": 55,   "reorder_level": 40,  "expiry_date": "2026-03-18", "supplier": "Sun Pharma Ltd",   "unit_cost": 890.00,  "status": "Low Stock"},
    {"drug_id": "DRG-0015", "name": "Heparin 5000IU",     "generic_name": "Heparin Sodium",           "category": "Anticoagulants",    "unit": "Vial",    "stock_qty": 180,  "reorder_level": 60,  "expiry_date": "2027-02-28", "supplier": "MedLine Pharma",   "unit_cost": 48.00,   "status": "OK"},
]

_MONTHS = [
    (date.today() - timedelta(days=30 * i)).strftime("%Y-%m")
    for i in range(5, -1, -1)
]
_DEPARTMENTS = ["ICU", "Cardiology", "General Ward", "Oncology", "Emergency", "OPD"]
_TOP_DRUGS = [
    "Paracetamol", "Amoxicillin/Clavulanate", "Metformin HCl",
    "Amlodipine Besylate", "Ciprofloxacin HCl", "Salbutamol",
]

random.seed(42)
_CONSUMPTION_DATA: list[dict[str, Any]] = [
    {
        "period": month,
        "drug_name": drug,
        "units_dispensed": (units := random.randint(80, 1200)),
        "department": dept,
        "avg_daily_consumption": round(units / 30, 2),
    }
    for month in _MONTHS
    for dept in _DEPARTMENTS
    for drug in _TOP_DRUGS
]


def _build_expiry_alerts() -> list[dict[str, Any]]:
    today = date.today()
    alerts = []
    for drug in _DRUGS:
        exp = date.fromisoformat(drug["expiry_date"])
        days_left = (exp - today).days
        if days_left <= 90:
            severity = (
                "Expired"  if days_left < 0  else
                "Critical" if days_left <= 30 else
                "Warning"
            )
            alerts.append({
                "drug_id":       drug["drug_id"],
                "drug_name":     drug["name"],
                "batch_number":  f"BATCH-{random.randint(10000, 99999)}",
                "expiry_date":   drug["expiry_date"],
                "days_to_expiry": days_left,
                "qty_at_risk":   drug["stock_qty"],
                "ward":          random.choice(_DEPARTMENTS),
                "severity":      severity,
            })
    return sorted(alerts, key=lambda x: x["days_to_expiry"])


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/inventory",
    response_model=list[DrugItem],
    summary="Get full pharmacy inventory",
)
async def get_inventory(
    category: Optional[str] = Query(None, description="Filter by drug category"),
    status: Optional[Literal["OK", "Low Stock", "Critical", "Expired"]] = Query(None),
    search: Optional[str] = Query(None, description="Search drug name or generic name"),
) -> list[dict[str, Any]]:
    results = list(_DRUGS)
    if category:
        results = [d for d in results if d["category"].lower() == category.lower()]
    if status:
        results = [d for d in results if d["status"] == status]
    if search:
        q = search.lower()
        results = [
            d for d in results
            if q in d["name"].lower() or q in d["generic_name"].lower()
        ]
    return results


@router.get("/inventory/summary", summary="Pharmacy KPI summary cards")
async def get_inventory_summary() -> dict[str, Any]:
    total_value = sum(d["unit_cost"] * d["stock_qty"] for d in _DRUGS)
    status_counts: dict[str, int] = {}
    category_counts: dict[str, int] = {}
    for d in _DRUGS:
        status_counts[d["status"]] = status_counts.get(d["status"], 0) + 1
        category_counts[d["category"]] = category_counts.get(d["category"], 0) + 1
    return {
        "total_skus": len(_DRUGS),
        "total_inventory_value_inr": round(total_value, 2),
        "status_breakdown": status_counts,
        "category_breakdown": category_counts,
        "low_stock_items": status_counts.get("Low Stock", 0),
        "critical_items": status_counts.get("Critical", 0),
        "expired_items": status_counts.get("Expired", 0),
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }


@router.get(
    "/consumption",
    response_model=list[ConsumptionSummary],
    summary="Monthly drug consumption analytics",
)
async def get_consumption(
    department: Optional[str] = Query(None),
    drug_name: Optional[str] = Query(None),
    months: int = Query(6, ge=1, le=12),
) -> list[dict[str, Any]]:
    cutoff = (date.today() - timedelta(days=30 * months)).strftime("%Y-%m")
    results = [r for r in _CONSUMPTION_DATA if r["period"] >= cutoff]
    if department:
        results = [r for r in results if r["department"].lower() == department.lower()]
    if drug_name:
        results = [r for r in results if drug_name.lower() in r["drug_name"].lower()]
    return results


@router.get(
    "/expiry-alerts",
    response_model=list[ExpiryAlert],
    summary="Drug expiry alerts",
)
async def get_expiry_alerts(
    within_days: int = Query(90, ge=0, le=365),
) -> list[dict[str, Any]]:
    today = date.today()
    cutoff = today + timedelta(days=within_days)
    return [
        a for a in _build_expiry_alerts()
        if date.fromisoformat(a["expiry_date"]) <= cutoff
    ]


@router.post("/restock", response_model=RestockResponse, status_code=201, summary="Raise a restock order")
async def raise_restock_order(payload: RestockRequest) -> dict[str, Any]:
    drug = next((d for d in _DRUGS if d["drug_id"] == payload.drug_id), None)
    if not drug:
        raise HTTPException(404, detail=f"Drug ID '{payload.drug_id}' not found.")
    lead_days = {"Routine": 7, "Urgent": 2, "Emergency": 1}[payload.urgency]
    return {
        "order_id":           f"PO-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{random.randint(100,999)}",
        "drug_id":            payload.drug_id,
        "drug_name":          drug["name"],
        "quantity":           payload.quantity,
        "estimated_delivery": (date.today() + timedelta(days=lead_days)).isoformat(),
        "urgency":            payload.urgency,
        "status":             "Order Raised — Pending Approval",
        "raised_at":          datetime.utcnow().isoformat() + "Z",
    }
