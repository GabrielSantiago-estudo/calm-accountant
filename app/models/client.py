from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    psychologist_id = Column(Integer, ForeignKey("psychologists.id"), nullable=False)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    session_type = Column(String(100), nullable=False)
    session_value = Column(Float, nullable=False)
    payment_status = Column(String(50), default="Active")
    notes = Column(Text, nullable=True)
    active_status = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    psychologist = relationship("Psychologist", back_populates="clients")
    sessions = relationship("Session", back_populates="client", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="client", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Client(id={self.id}, name={self.full_name})>"


# calm-accountant/app/routes/clients.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientResponse

router = APIRouter(prefix="/api/psychologists/{psychologist_id}", tags=["clients"])

@router.get("/clients", response_model=list[ClientResponse])
def get_clients(psychologist_id: int, db: Session = Depends(get_db)):
    try:
        return db.query(Client).filter(Client.psychologist_id == psychologist_id).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar clientes: {str(e)}")

@router.post("/clients", response_model=ClientResponse)
def create_client(psychologist_id: int, client: ClientCreate, db: Session = Depends(get_db)):
    try:
        new_client = Client(**client.dict(), psychologist_id=psychologist_id)
        db.add(new_client)
        db.commit()
        db.refresh(new_client)
        return new_client
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar cliente: {str(e)}")

@router.get("/income/monthly")
def get_monthly_income(psychologist_id: int, db: Session = Depends(get_db)):
    from app.models.transaction import Transaction
    try:
        result = db.query(func.sum(Transaction.amount)).filter(
            Transaction.psychologist_id == psychologist_id,
            Transaction.trans_type == 'Receita',
            func.extract('year', Transaction.trans_date) == func.extract('year', func.now()),
            func.extract('month', Transaction.trans_date) == func.extract('month', func.now())
        ).scalar()
        return {"monthly_income": result or 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar receita: {str(e)}")