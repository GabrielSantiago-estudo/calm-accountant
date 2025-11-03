from app.database.connection import DatabaseConnection
import os

def init_database():
    db = DatabaseConnection()
    connection = db.get_connection()
    
    if connection:
        try:
            cursor = connection.cursor()
            
            # Lê o arquivo SQL
            sql_path = os.path.join(os.path.dirname(__file__), '../../scripts/database_schema.sql')
            with open(sql_path, 'r', encoding='utf-8') as file:
                sql_script = file.read()
            
            # Executa cada statement
            statements = sql_script.split(';')
            for statement in statements:
                if statement.strip():
                    cursor.execute(statement)
            
            connection.commit()
            print("✅ Banco de dados inicializado com sucesso!")
            
        except Exception as e:
            print(f"❌ Erro ao inicializar banco: {e}")
        finally:
            cursor.close()