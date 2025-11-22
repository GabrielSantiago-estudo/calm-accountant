# calm-accountant/app/models/transaction.py
from sqlalchemy import Column, Integer, String, Float, Date, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    psychologist_id = Column(Integer, ForeignKey("psychologists.id"), nullable=False)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    amount = Column(Float, nullable=False)
    trans_type = Column(String(50), nullable=False)  # Receita ou Despesa
    trans_category = Column(String(100), nullable=False)
    trans_date = Column(Date, nullable=False)
    description = Column(Text, nullable=True)
    trans_status = Column(String(50), default="Paid")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    psychologist = relationship("Psychologist", back_populates="transactions")
    client = relationship("Client", back_populates="transactions")

    def __repr__(self):
        return f"<Transaction(id={self.id}, type={self.trans_type}, amount={self.amount})>"