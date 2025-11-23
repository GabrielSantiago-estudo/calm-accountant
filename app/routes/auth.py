# app/routes/auth.py
import os
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Funções auxiliares internas
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# 🔐 Login administrativo interno
@router.post("/admin-login")
def admin_login(email: str, password: str):
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")

    if email != admin_email or password != admin_password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": email, "role": "admin"})
    return {"access_token": token, "token_type": "bearer"}
