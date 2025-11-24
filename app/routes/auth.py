from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.hash import bcrypt
from app.database.connection import get_db
from app.models.psychologist import Psychologist as PsychologistModel
from app.schemas.psychologist import Psychologist as PsychologistSchema
from typing import Optional

router = APIRouter(prefix="/api/auth", tags=["auth"])

# 🔐 Configurações JWT
SECRET_KEY = "your-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ✅ Gerar token JWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ✅ Login de psicóloga
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    psychologist = db.query(PsychologistModel).filter_by(email=form_data.username).first()
    if not psychologist or not bcrypt.verify(form_data.password, psychologist.password_hash):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    access_token = create_access_token(data={"sub": psychologist.email})
    return {"access_token": access_token, "token_type": "bearer"}

# ✅ Dependência para proteger rotas
def get_current_psychologist(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido ou expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    psychologist = db.query(PsychologistModel).filter_by(email=email).first()
    if psychologist is None:
        raise credentials_exception
    return psychologist
