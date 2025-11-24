from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.transaction import Transaction as TransactionModel
from app.models.psychologist import Psychologist as PsychologistModel
from app.models.client import Client as ClientModel
from app.schemas.transaction import TransactionCreate, Transaction as TransactionSchema
from datetime import date

router = APIRouter(prefix="/api/transactions", tags=["transactions"])

# ✅ Criar nova transação
@router.post("/", response_model=TransactionSchema, status_code=status.HTTP_201_CREATED)
def create_transaction(transaction_data: TransactionCreate, db: Session = Depends(get_db)):
    psychologist = db.query(PsychologistModel).filter_by(id=transaction_data.psychologist_id).first()
    if not psychologist:
        raise HTTPException(status_code=404, detail="Psicólogo não encontrado.")

    if transaction_data.client_id:
        client = db.query(ClientModel).filter_by(id=transaction_data.client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail="Cliente vinculado não encontrado.")

    new_transaction = TransactionModel(
        psychologist_id=transaction_data.psychologist_id,
        client_id=transaction_data.client_id,
        amount=transaction_data.amount,
        trans_type=transaction_data.trans_type,
        trans_category=transaction_data.trans_category,
        trans_date=transaction_data.trans_date or date.today(),
        description=transaction_data.description,
        trans_status=transaction_data.trans_status
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

# ✅ Listar todas as transações
@router.get("/", response_model=List[TransactionSchema])
def get_all_transactions(db: Session = Depends(get_db)):
    return db.query(TransactionModel).all()

# ✅ Buscar transação específica
@router.get("/{transaction_id}", response_model=TransactionSchema)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(TransactionModel).filter_by(id=transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transação não encontrada.")
    return transaction

# ✅ Atualizar transação
@router.put("/{transaction_id}", response_model=TransactionSchema)
def update_transaction(transaction_id: int, transaction_data: TransactionCreate, db: Session = Depends(get_db)):
    transaction = db.query(TransactionModel).filter_by(id=transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transação não encontrada.")

    for key, value in transaction_data.dict().items():
        setattr(transaction, key, value)
    db.commit()
    db.refresh(transaction)
    return transaction

# ✅ Deletar transação
@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(TransactionModel).filter_by(id=transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transação não encontrada.")
    db.delete(transaction)
    db.commit()
    return {"message": "Transação deletada com sucesso."}
