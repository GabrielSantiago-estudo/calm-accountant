from pydantic import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Banco de Dados
    DB_TYPE: str = "mysql"
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = "NovaSenhaSegura123!"
    DB_NAME: str = "calm_accountant"

    # Aplicação
    PORT: int = 8000

    # Segurança / JWT
    SECRET_KEY: str = "uma_chave_super_secreta_e_segura"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def database_url(self) -> str:
        """Gera a URL completa de conexão"""
        return f"{self.DB_TYPE}://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
