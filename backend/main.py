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

class LoginData(BaseModel):
    username: str
    password: str
    accountType: str

class UserRegister(BaseModel):
    username: str
    password: str
    role: str = "user"
class AdminRegister(BaseModel):
    username: str
    password: str
    role: str = "admin"
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

@app.post("/api/login")
def login_user(data: LoginData):
    conn = sqlite3.connect("211Memphis.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Map "business" → "organization" since your table uses that role
    role = "organization" if data.accountType == "business" else data.accountType

    cursor.execute(
        "SELECT * FROM users WHERE username = ? AND password = ? AND role = ?",
        (data.username, data.password, role)
    )
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "role": user["role"], "username": user["username"]}



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

@app.get("/api/organizations")
def get_all_organizations():
    conn = sqlite3.connect("211Memphis.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, org_name AS name, org_service_description AS desc,
               org_eligibility AS eligibility, org_address, org_phone, org_email
        FROM users
        WHERE role = 'organization'
    """)
    orgs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return {"organizations": orgs}

@app.post("/api/register/user")
def register_user(user: UserRegister):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if username exists
    cursor.execute("SELECT * FROM users WHERE username = ?", (user.username,))
    existing = cursor.fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    cursor.execute("""
        INSERT INTO users (username, password, role)
        VALUES (?, ?, ?)
    """, (user.username, user.password, user.role))

    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@app.post("/api/register/admin")
def register_user(user: AdminRegister):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if username exists
    cursor.execute("SELECT * FROM users WHERE username = ?", (user.username,))
    existing = cursor.fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    cursor.execute("""
        INSERT INTO users (username, password, role)
        VALUES (?, ?, ?)
    """, (user.username, user.password, user.role))

    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}
