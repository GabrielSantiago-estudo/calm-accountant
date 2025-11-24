from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.config import settings
from app.services.auth import verify_password, get_password_hash, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


# 🔐 Login administrativo interno
@router.post("/admin-login")
def admin_login(email: str, password: str):
    admin_email = settings.ADMIN_EMAIL
    admin_password = settings.ADMIN_PASSWORD

    if admin_email is None or admin_password is None:
        raise HTTPException(status_code=500, detail="Admin credentials are not configured")

    if email != admin_email or password != admin_password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": email, "role": "admin"})
    return {"access_token": token, "token_type": "bearer"}
