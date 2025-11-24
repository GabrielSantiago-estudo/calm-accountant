from app.database.connection import Base, DatabaseConnection
from app.models import client, psychologist, session, transaction
from sqlalchemy.exc import SQLAlchemyError


def init_database() -> None:
    try:
        db_instance = DatabaseConnection()
        engine = db_instance.engine
        if engine is None:
            raise RuntimeError("Engine não foi inicializada corretamente.")

        Base.metadata.create_all(bind=engine)
        print("✅ Banco de dados inicializado com sucesso!")
    except SQLAlchemyError as e:
        print(f"❌ Erro ao inicializar banco de dados: {e}")
    except Exception as e:
        print(f"⚠️ Erro inesperado: {e}")
