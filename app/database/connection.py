import mysql.connector
from mysql.connector import Error
from app.config import settings

class DatabaseConnection:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._create_connection()
        return cls._instance
    
    def _create_connection(self):
        try:
            self.connection = mysql.connector.connect(
                host=settings.DB_HOST,
                user=settings.DB_USER,
                password=settings.DB_PASSWORD,
                database=settings.DB_NAME
            )
            print("✅ Conectado ao MySQL")
        except Error as e:
            print(f"❌ Erro ao conectar: {e}")
            self.connection = None
    
    def get_connection(self):
        if self.connection and self.connection.is_connected():
            return self.connection
        else:
            self._create_connection()
            return self.connection
    
    def close_connection(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("🔌 Conexão fechada")

def get_db():
    db = DatabaseConnection()
    connection = db.get_connection()
    try:
        yield connection
    finally:
        pass  # Não fechamos a conexão para reutilização