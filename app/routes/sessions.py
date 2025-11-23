from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.session import Session as SessionModel
from app.schemas.session import SessionCreate, SessionResponse

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

@router.get("/", response_model=list[SessionResponse])
def list_sessions(db: Session = Depends(get_db)):
    return db.query(SessionModel).all()

@router.post("/", response_model=SessionResponse)
def create_session(data: SessionCreate, db: Session = Depends(get_db)):
    new_session = SessionModel(**data.model_dump())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session
