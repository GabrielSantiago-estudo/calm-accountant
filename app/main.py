from fastapi import FastAPI
from app.database.init_db import init_database
from app.routes import clients, sessions, transactions
from app.config import settings

app = FastAPI(
    title="Calm Accountant API",
    description="API para gerenciamento financeiro de psicólogos",
    version="1.0.0"
)

# Inicializar banco de dados
@app.on_event("startup")
async def startup_event():
    init_database()

# Rotas
app.include_router(clients.router)
app.include_router(sessions.router)
app.include_router(transactions.router)

@app.get("/")
async def root():
    return {"message": "Calm Accountant API está rodando! 🚀"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)