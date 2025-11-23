from pydantic import BaseModel

class ClientCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None

class ClientResponse(ClientCreate):
    id: int

    class Config:
        orm_mode = True
