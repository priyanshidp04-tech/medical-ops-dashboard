"""
Medical Operations Intelligence Dashboard — FastAPI Entry Point
Run with: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from module9_pharmacy.router import router as pharmacy_router

app = FastAPI(
    title="Medical Ops Intelligence API",
    description="Backend API for the Medical Operations Intelligence Dashboard",
    version="1.0.0",
)

# Allow the Next.js dev server and the HTML file to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register module routers
app.include_router(pharmacy_router)


@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "message": "Medical Ops Intelligence API is running"}
