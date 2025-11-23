from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database.init_db import init_database

# Importar rotas (garanta que os arquivos existem)
from app.routes import auth, psychologists, clients, sessions, transactions


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Inicializando Calm Accountant API...")
    init_database()
    yield
    print("🛑 Encerrando Calm Accountant API...")


app = FastAPI(
    title="Calm Accountant API",
    description="API para gerenciamento financeiro de psicólogos",
    version="1.0.1",
    lifespan=lifespan,
)


# Configuração CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://lovable.dev",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Inclusão das rotas
app.include_router(auth.router)
app.include_router(psychologists.router)
app.include_router(clients.router)
app.include_router(sessions.router)
app.include_router(transactions.router)


@app.get("/")
async def root():
    return {"message": "✅ Calm Accountant API rodando com sucesso!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
