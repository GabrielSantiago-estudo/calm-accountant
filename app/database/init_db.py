from app.database.connection import Base, engine
from sqlalchemy.exc import SQLAlchemyError

# Importa modelos
try:
    import app.models.client
    import app.models.psychologist
    import app.models.session
    import app.models.transaction
except Exception as e:
    print(f"⚠️ Erro ao importar modelos: {e}")

def init_database() -> None:
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Banco de dados inicializado com sucesso!")
    except SQLAlchemyError as e:
        print(f"❌ Erro ao inicializar banco de dados: {e}")
    except Exception as e:
        print(f"⚠️ Erro inesperado: {e}")
