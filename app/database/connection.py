from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

# Use a URL centralizada a partir das settings
DATABASE_URL = settings.database_url


# Criação do engine e da sessão. Se MySQL falhar, usar SQLite de fallback.
def _create_engine_with_fallback(url: str):
    # detect sqlite
    is_sqlite = url.startswith("sqlite:")
    try:
        if is_sqlite:
            eng = create_engine(url, connect_args={"check_same_thread": False})
        else:
            eng = create_engine(url)

        # Test connection
        with eng.connect() as conn:
            pass
        return eng
    except Exception as e:
        print(f"⚠️ Não foi possível conectar ao banco de dados ({'sqlite' if is_sqlite else 'db'}): {e}")
        # If we were not already using sqlite, fallback to sqlite
        if not is_sqlite:
            fallback = f"sqlite:///{settings.SQLITE_PATH}"
            print(f"⚠️ Usando SQLite de fallback: {fallback}")
            eng = create_engine(fallback, connect_args={"check_same_thread": False})
            return eng
        raise


engine = _create_engine_with_fallback(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Classe para gerenciar conexões de banco (context manager simplificado)
class DatabaseConnection:
    def __init__(self):
        self.db = SessionLocal()

    def __enter__(self):
        return self.db

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.db.close()


# Função utilitária usada pelos models e serviços
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
