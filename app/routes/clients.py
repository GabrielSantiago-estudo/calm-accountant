from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientResponse

router = APIRouter(prefix="/api/psychologists/{psychologist_id}/clients", tags=["clients"])

@router.get("/", response_model=list[ClientResponse])
def get_clients(psychologist_id: int, db: Session = Depends(get_db)):
    return db.query(Client).filter(Client.psychologist_id == psychologist_id).all()

@router.post("/", response_model=ClientResponse)
def create_client(psychologist_id: int, client: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**client.model_dump(), psychologist_id=psychologist_id)
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client
