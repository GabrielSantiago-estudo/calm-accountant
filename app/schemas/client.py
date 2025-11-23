from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClientBase(BaseModel):
    full_name: str
    email: str
    phone: str
    session_type: str
    session_value: float
    payment_status: str = "Active"
    notes: Optional[str] = None
    active_status: bool = True

class ClientCreate(ClientBase):
    psychologist_id: int

class ClientResponse(ClientBase):
    id: int
    psychologist_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
