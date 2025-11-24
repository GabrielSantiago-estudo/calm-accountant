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