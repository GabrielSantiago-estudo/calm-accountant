from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.psychologist import Psychologist
from app.schemas.psychologist import PsychologistCreate, PsychologistResponse
from app.services.auth import get_password_hash

router = APIRouter(prefix="/api/psychologists", tags=["psychologists"])

@router.post("/", response_model=PsychologistResponse)
def create_psychologist(data: PsychologistCreate, db: Session = Depends(get_db)):
    existing = db.query(Psychologist).filter(Psychologist.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    hashed_pw = get_password_hash(data.password)
    new_psychologist = Psychologist(
        full_name=data.full_name,
        email=data.email,
        licence_number=data.licence_number,
        password=hashed_pw
    )

    db.add(new_psychologist)
    db.commit()
    db.refresh(new_psychologist)
    return new_psychologist

@router.get("/", response_model=list[PsychologistResponse])
def list_psychologists(db: Session = Depends(get_db)):
    return db.query(Psychologist).all()
