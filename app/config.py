from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional
from urllib.parse import quote_plus

class Settings(BaseSettings):
    # Banco de Dados
    DB_TYPE: str = "mysql"
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = "Admin@123"
    DB_NAME: str = "ProjetoExtensão"

    # Aplicação
    PORT: int = 8000

    # Segurança / JWT
    SECRET_KEY: str = "uma_chave_super_secreta_e_segura"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Admin (opcional) — use .env para configurar
    ADMIN_EMAIL: Optional[str] = None
    ADMIN_PASSWORD: Optional[str] = None
    # SQLite fallback (dev)
    SQLITE_PATH: str = "./dev.db"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # ← ESSA LINHA É O SEGREDO

    @property
    def database_url(self) -> str:
        if self.DB_TYPE.lower() == "sqlite":
            return f"sqlite:///{self.SQLITE_PATH}"

        user = quote_plus(self.DB_USER)
        password = quote_plus(self.DB_PASSWORD or "")
        host = quote_plus(self.DB_HOST)
        return f"{self.DB_TYPE}+mysqlconnector://{user}:{password}@{host}:{self.DB_PORT}/{self.DB_NAME}"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
