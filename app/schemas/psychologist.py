from pydantic import BaseModel
from datetime import datetime

class PsychologistBase(BaseModel):
    full_name: str
    email: str
    licence_number: str

class PsychologistCreate(PsychologistBase):
    password: str

class PsychologistResponse(PsychologistBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
