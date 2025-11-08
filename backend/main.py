from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="../HackMem25", html=True), name="static")

# Allow cross-origin (for frontend connection)
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# DB connection
def get_db_connection():
    conn = sqlite3.connect("211Memphis.db")
    conn.row_factory = sqlite3.Row
    return conn

class OrganizationUser(BaseModel):
    username: str
    password: str
    role: str = "organization"
    org_name: str
    org_address: str
    org_phone: str
    org_email: str | None = None
    org_service_description: str | None = None
    org_eligibility: str | None = None
    org_intake_procedure: str | None = None
    org_hours: str | None = None

@app.post("/api/register/organization")
def register_org_user(user: OrganizationUser):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO users (
            username, password, role,
            org_name, org_address, org_phone, org_email,
            org_service_description, org_eligibility, org_intake_procedure, org_hours
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        user.username, user.password, user.role,
        user.org_name, user.org_address, user.org_phone, user.org_email,
        user.org_service_description, user.org_eligibility,
        user.org_intake_procedure, user.org_hours
    ))
    conn.commit()
    conn.close()
    return {"message": "Organization user registered successfully"}
