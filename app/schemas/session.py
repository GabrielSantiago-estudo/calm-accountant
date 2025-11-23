from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class SessionBase(BaseModel):
    client_id: int
    session_date: date
    session_time: str
    session_status: str = "Scheduled"
    notes: Optional[str] = None

class SessionCreate(SessionBase):
    pass

class SessionResponse(SessionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
