from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.psychologist import Psychologist as PsychologistModel
from app.schemas.psychologist import PsychologistCreate, Psychologist as PsychologistSchema
from datetime import datetime
from passlib.hash import bcrypt

router = APIRouter(prefix="/api/psychologists", tags=["psychologists"])

# ✅ Criar novo psicólogo
@router.post("/", response_model=PsychologistSchema, status_code=status.HTTP_201_CREATED)
def create_psychologist(psychologist: PsychologistCreate, db: Session = Depends(get_db)):
    existing = db.query(PsychologistModel).filter_by(email=psychologist.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    db_psychologist = PsychologistModel(
        full_name=psychologist.full_name,
        email=psychologist.email,
        licence_number=psychologist.licence_number,
        password_hash=bcrypt.hash(psychologist.password),
        created_at=datetime.utcnow()
    )
    db.add(db_psychologist)
    db.commit()
    db.refresh(db_psychologist)
    return db_psychologist

# ✅ Listar todos os psicólogos
@router.get("/", response_model=List[PsychologistSchema])
def get_all_psychologists(db: Session = Depends(get_db)):
    return db.query(PsychologistModel).all()

# ✅ Buscar psicólogo por ID
@router.get("/{psychologist_id}", response_model=PsychologistSchema)
def get_psychologist(psychologist_id: int, db: Session = Depends(get_db)):
    psychologist = db.query(PsychologistModel).filter_by(id=psychologist_id).first()
    if not psychologist:
        raise HTTPException(status_code=404, detail="Psicólogo não encontrado.")
    return psychologist

# ✅ Deletar psicólogo
@router.delete("/{psychologist_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_psychologist(psychologist_id: int, db: Session = Depends(get_db)):
    psychologist = db.query(PsychologistModel).filter_by(id=psychologist_id).first()
    if not psychologist:
        raise HTTPException(status_code=404, detail="Psicólogo não encontrado.")
    db.delete(psychologist)
    db.commit()
    return {"message": "Psicólogo deletado com sucesso."}
