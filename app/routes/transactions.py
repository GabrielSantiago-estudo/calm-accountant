from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.connection import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionResponse

router = APIRouter(prefix="/api/transactions", tags=["transactions"])

@router.get("/", response_model=list[TransactionResponse])
def list_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()

@router.post("/", response_model=TransactionResponse)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    new_transaction = Transaction(**data.model_dump())
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

@router.get("/income/monthly")
def get_monthly_income(db: Session = Depends(get_db)):
    result = (
        db.query(func.sum(Transaction.amount))
        .filter(Transaction.trans_type == "Receita")
        .filter(func.extract("month", Transaction.trans_date) == func.extract("month", func.now()))
        .scalar()
    )
    return {"monthly_income": result or 0.0}
