from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError
from app.config import settings


Base = declarative_base()


class DatabaseConnection:
    _instance = None


def __new__(cls):
    if cls._instance is None:
        cls._instance = super().__new__(cls)
        cls._instance._create_engine()
    return cls._instance

def _create_engine(self):
    try:
        self.engine = create_engine(settings.database_url, echo=False, pool_pre_ping=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        print("✅ Conectado ao banco de dados via SQLAlchemy")
    except SQLAlchemyError as e:
        print(f"❌ Erro ao criar engine: {e}")
        self.engine = None
        self.SessionLocal = None

def get_session(self):
    if not hasattr(self, "SessionLocal") or self.SessionLocal is None:
        self._create_engine()
    if self.SessionLocal is None:
        raise RuntimeError("Não foi possível criar a Session do banco de dados")
    return self.SessionLocal()

# Dependência padrão FastAPI
def get_db():
    db = DatabaseConnection().get_session()
    try:
        yield db
    finally:
        db.close()