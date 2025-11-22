import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_NAME = os.getenv("DB_NAME", "psifinance")
    PORT = int(os.getenv("PORT", 8000))
    # Gere uma chave segura com: openssl rand -hex 32
    SECRET_KEY = os.getenv("SECRET_KEY", "uma_chave_super_secreta_e_segura")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

settings = Settings()