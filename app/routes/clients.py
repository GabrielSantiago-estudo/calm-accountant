from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.client import Client as ClientModel
from app.models.psychologist import Psychologist as PsychologistModel
from app.schemas.client import ClientCreate, Client as ClientSchema

router = APIRouter(prefix="/api/psychologists/{psychologist_id}/clients", tags=["clients"])

# ✅ Criar cliente vinculado a um psicólogo
@router.post("/", response_model=ClientSchema, status_code=status.HTTP_201_CREATED)
def create_client(psychologist_id: int, client: ClientCreate, db: Session = Depends(get_db)):
    psychologist = db.query(PsychologistModel).filter_by(id=psychologist_id).first()
    if not psychologist:
        raise HTTPException(status_code=404, detail="Psicólogo não encontrado.")

    db_client = ClientModel(
        psychologist_id=psychologist_id,
        full_name=client.full_name,
        email=client.email,
        phone=client.phone,
        session_type=client.session_type,
        session_value=client.session_value,
        payment_status=client.payment_status,
        notes=client.notes,
        active_status=client.active_status
    )

    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

# ✅ Listar todos os clientes de um psicólogo
@router.get("/", response_model=List[ClientSchema])
def get_clients(psychologist_id: int, db: Session = Depends(get_db)):
    clients = db.query(ClientModel).filter_by(psychologist_id=psychologist_id).all()
    return clients

# ✅ Buscar cliente específico
@router.get("/{client_id}", response_model=ClientSchema)
def get_client(psychologist_id: int, client_id: int, db: Session = Depends(get_db)):
    client = db.query(ClientModel).filter_by(id=client_id, psychologist_id=psychologist_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado.")
    return client

# ✅ Atualizar cliente
@router.put("/{client_id}", response_model=ClientSchema)
def update_client(psychologist_id: int, client_id: int, updated_client: ClientCreate, db: Session = Depends(get_db)):
    client = db.query(ClientModel).filter_by(id=client_id, psychologist_id=psychologist_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado.")

    for key, value in updated_client.dict().items():
        setattr(client, key, value)

    db.commit()
    db.refresh(client)
    return client

# ✅ Deletar cliente
@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(psychologist_id: int, client_id: int, db: Session = Depends(get_db)):
    client = db.query(ClientModel).filter
