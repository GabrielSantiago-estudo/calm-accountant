# calm-accountant/app/models/session.py
from sqlalchemy import Column, Integer, String, Date, Time, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    psychologist_id = Column(Integer, ForeignKey("psychologists.id"), nullable=False)
    session_date = Column(Date, nullable=False)
    session_time = Column(Time, nullable=False)
    session_status = Column(String(50), default="Scheduled")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("Client", back_populates="sessions")
    psychologist = relationship("Psychologist", back_populates="sessions")

    def __repr__(self):
        return f"<Session(id={self.id}, date={self.session_date}, status={self.session_status})>"