from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class TransactionBase(BaseModel):
    amount: float
    trans_type: str  # 'Receita' ou 'Despesa'
    trans_category: str
    trans_date: date
    description: Optional[str] = None
    trans_status: str = "Paid"

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    psychologist_id: int
    created_at: datetime
    class Config:
        from_attributes = True