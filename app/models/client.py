from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClientBase(BaseModel):
    full_name: str
    email: str
    phone: str
    session_type: str
    session_value: float
    payment_status: str = "Active"
    notes: Optional[str] = None
    active_status: bool = True

class ClientCreate(ClientBase):
    psychologist_id: int

class Client(ClientBase):
    id: int
    psychologist_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True



from fastapi import APIRouter, HTTPException, Depends
import mysql.connector
from app.database.connection import get_db
from app.models.client import Client, ClientCreate

router = APIRouter(prefix="/api/psychologists/{psychologist_id}", tags=["clients"])

@router.get("/clients", response_model=list[Client])
async def get_clients(psychologist_id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM clients WHERE psychologist_id = %s"
        cursor.execute(query, (psychologist_id,))
        clients = cursor.fetchall()
        return clients
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar clientes: {str(e)}")
    finally:
        cursor.close()

@router.post("/clients", response_model=Client)
async def create_client(
    psychologist_id: int, 
    client: ClientCreate, 
    db: mysql.connector.MySQLConnection = Depends(get_db)
):
    try:
        cursor = db.cursor()
        query = """
            INSERT INTO clients 
            (psychologist_id, full_name, email, phone, session_type, session_value, payment_status, notes, active_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            psychologist_id,
            client.full_name,
            client.email,
            client.phone,
            client.session_type,
            client.session_value,
            client.payment_status,
            client.notes,
            client.active_status
        )
        
        cursor.execute(query, values)
        db.commit()
        
        # Busca o cliente criado
        client_id = cursor.lastrowid
        cursor.execute("SELECT * FROM clients WHERE id = %s", (client_id,))
        new_client = cursor.fetchone()
        
        return new_client
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar cliente: {str(e)}")
    finally:
        cursor.close()

@router.get("/income/monthly")
async def get_monthly_income(psychologist_id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT SUM(amount) AS monthly_income
            FROM transactions 
            WHERE psychologist_id = %s
              AND trans_type = 'Receita'
              AND EXTRACT(YEAR_MONTH FROM trans_date) = EXTRACT(YEAR_MONTH FROM CURDATE())
        """
        cursor.execute(query, (psychologist_id,))
        result = cursor.fetchone()
        
        return {"monthly_income": result['monthly_income'] or 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar receita: {str(e)}")
    finally:
        cursor.close()