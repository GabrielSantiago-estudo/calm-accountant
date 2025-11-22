from fastapi import APIRouter, HTTPException, Depends
import mysql.connector
from app.database.connection import get_db
from app.models.session import Session, SessionCreate

router = APIRouter(prefix="/api/psychologists/{psychologist_id}/sessions", tags=["sessions"])

@router.get("/", response_model=list[Session])
async def list_sessions(psychologist_id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        query = """
            SELECT s.* FROM sessions s
            JOIN clients c ON s.client_id = c.id
            WHERE c.psychologist_id = %s
        """
        cursor.execute(query, (psychologist_id,))
        return cursor.fetchall()
    finally:
        cursor.close()

@router.post("/", response_model=Session)
async def add_session(psychologist_id: int, session: SessionCreate, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    try:
        # Valida se cliente pertence ao psicologo
        cursor.execute("SELECT id FROM clients WHERE id = %s AND psychologist_id = %s", (session.client_id, psychologist_id))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

        query = """
            INSERT INTO sessions (client_id, session_date, session_time, session_status, notes)
            VALUES (%s, %s, %s, %s, %s)
        """
        vals = (session.client_id, session.session_date, session.session_time, session.session_status, session.notes)
        cursor.execute(query, vals)
        db.commit()
        
        new_id = cursor.lastrowid
        cursor.execute("SELECT * FROM sessions WHERE id = %s", (new_id,))
        return cursor.fetchone()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()