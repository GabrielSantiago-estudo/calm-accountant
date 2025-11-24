from app.database.connection import Base, engine
# Importar modelos para que sejam registrados no MetaData
import app.models.client
import app.models.psychologist
import app.models.session
import app.models.transaction
from sqlalchemy.exc import SQLAlchemyError


def init_database() -> None:
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Banco de dados inicializado com sucesso!")
    except SQLAlchemyError as e:
        print(f"❌ Erro ao inicializar banco de dados: {e}")
    except Exception as e:
        print(f"⚠️ Erro inesperado: {e}")
