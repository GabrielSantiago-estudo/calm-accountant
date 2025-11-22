from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.init_db import init_database
# Adicionamos 'auth' aqui na importação
from app.routes import clients, sessions, transactions, psychologists, auth 
from app.config import settings

app = FastAPI(
    title="Calm Accountant API",
    description="API para gerenciamento financeiro de psicólogos",
    version="1.0.0"
)

# --- Configuração do CORS ---
# Isso permite que o Lovable (frontend) converse com seu Python (backend)
origins = [
    "https://lovable.dev",
    "http://localhost",
    "http://localhost:3000",
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, mude para a lista 'origins' acima
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Inicialização do Banco ---
@app.on_event("startup")
async def startup_event():
    init_database()

# --- Rotas (Endpoints) ---
app.include_router(auth.router)          # Login e Registro (ESSENCIAL)
app.include_router(psychologists.router) # Perfil do Psicólogo
app.include_router(clients.router)       # Gestão de Clientes
app.include_router(sessions.router)      # Agendamento
app.include_router(transactions.router)  # Financeiro

# Rota raiz para teste
@app.get("/")
async def root():
    return {"message": "Calm Accountant API está rodando! 🚀"}

# Bloco para rodar diretamente pelo Python (opcional, mas útil)
if __name__ == "__main__":
    import uvicorn
    # O reload=True permite que o servidor reinicie ao salvar o código
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)