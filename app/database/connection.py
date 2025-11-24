from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

DATABASE_URL = settings.database_url


def _create_engine_with_fallback(url: str):
    is_sqlite = url.startswith("sqlite:")
    try:
        if is_sqlite:
            eng = create_engine(url, connect_args={"check_same_thread": False})
        else:
            eng = create_engine(url)

        # ✅ Testa a conexão com sintaxe moderna
        with eng.connect() as conn:
            conn.execute(text("SELECT 1"))

        print(f"✅ Conectado ao banco: {url}")
        return eng
    except Exception as e:
        print(f"⚠️ Falha ao conectar ao banco ({url}): {e}")
        if not is_sqlite:
            fallback = f"sqlite:///{settings.SQLITE_PATH}"
            print(f"⚠️ Usando SQLite de fallback: {fallback}")
            eng = create_engine(fallback, connect_args={"check_same_thread": False})
            return eng
        raise


# ✅ Criação das instâncias principais do SQLAlchemy
engine = _create_engine_with_fallback(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ✅ Context manager para sessões
class DatabaseConnection:
    def __init__(self):
        self.db = SessionLocal()

    def __enter__(self):
        return self.db

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.db.close()


# ✅ Função utilitária para dependência FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
