from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import mysql.connector
from app.database.connection import get_db
from app.services.auth import verify_password, create_access_token, get_password_hash
from app.models.psychologist import PsychologistCreate

router = APIRouter(tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register")
async def register(user: PsychologistCreate, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        # Verificar se email existe
        cursor.execute("SELECT * FROM psychologists WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email já cadastrado")
            
        hashed_pw = get_password_hash(user.password)
        query = "INSERT INTO psychologists (full_name, email, licence_number, password_hash) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (user.full_name, user.email, user.licence_number, hashed_pw))
        db.commit()
        return {"msg": "Usuário criado com sucesso"}
    finally:
        cursor.close()

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM psychologists WHERE email = %s", (form_data.username,))
        user = cursor.fetchone()
        
        if not user or not verify_password(form_data.password, user['password_hash']):
            raise HTTPException(status_code=401, detail="Email ou senha incorretos")
            
        access_token = create_access_token(data={"sub": str(user['id']), "email": user['email']})
        return {"access_token": access_token, "token_type": "bearer", "id": user['id']}
    finally:
        cursor.close()