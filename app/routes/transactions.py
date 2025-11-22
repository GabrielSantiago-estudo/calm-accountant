from fastapi import APIRouter, HTTPException, Depends
import mysql.connector
from app.database.connection import get_db
from app.models.transaction import Transaction, TransactionCreate

router = APIRouter(prefix="/api/psychologists/{psychologist_id}/transactions", tags=["transactions"])

@router.get("/", response_model=list[Transaction])
async def get_transactions(psychologist_id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM transactions WHERE psychologist_id = %s", (psychologist_id,))
        return cursor.fetchall()
    finally:
        cursor.close()

@router.post("/", response_model=Transaction)
async def create_transaction(psychologist_id: int, trans: TransactionCreate, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        query = """
            INSERT INTO transactions (psychologist_id, amount, trans_type, trans_category, trans_date, description, trans_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        vals = (psychologist_id, trans.amount, trans.trans_type, trans.trans_category, trans.trans_date, trans.description, trans.trans_status)
        cursor.execute(query, vals)
        db.commit()
        
        new_id = cursor.lastrowid
        cursor.execute("SELECT * FROM transactions WHERE id = %s", (new_id,))
        return cursor.fetchone()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()