from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Psychologist(Base):
    __tablename__ = "psychologists"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    licence_number = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    clients = relationship("Client", back_populates="psychologist", cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="psychologist", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="psychologist", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Psychologist(id={self.id}, name={self.full_name})>"