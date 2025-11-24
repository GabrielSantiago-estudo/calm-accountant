from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.session import Session as SessionModel
from app.models.client import Client as ClientModel
from app.models.psychologist import Psychologist as PsychologistModel
from app.schemas.session import SessionCreate, Session as SessionSchema

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

# ✅ Criar nova sessão
@router.post("/", response_model=SessionSchema, status_code=status.HTTP_201_CREATED)
def create_session(session_data: SessionCreate, db: Session = Depends(get_db)):
    client = db.query(ClientModel).filter_by(id=session_data.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado.")

    psychologist = db.query(PsychologistModel).filter_by(id=client.psychologist_id).first()
    if not psychologist:
        raise HTTPException(status_code=404, detail="Psicólogo associado não encontrado.")

    new_session = SessionModel(
        client_id=session_data.client_id,
        psychologist_id=client.psychologist_id,
        session_date=session_data.session_date,
        session_time=session_data.session_time,
        session_status=session_data.session_status,
        notes=session_data.notes
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

# ✅ Listar todas as sessões
@router.get("/", response_model=List[SessionSchema])
def get_all_sessions(db: Session = Depends(get_db)):
    return db.query(SessionModel).all()

# ✅ Buscar sessão específica
@router.get("/{session_id}", response_model=SessionSchema)
def get_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sessão não encontrada.")
    return session

# ✅ Atualizar sessão
@router.put("/{session_id}", response_model=SessionSchema)
def update_session(session_id: int, session_data: SessionCreate, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sessão não encontrada.")

    for key, value in session_data.dict().items():
        setattr(session, key, value)
    db.commit()
    db.refresh(session)
    return session

# ✅ Deletar sessão
@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sessão não encontrada.")
    db.delete(session)
    db.commit()
    return {"message": "Sessão deletada com sucesso."}
