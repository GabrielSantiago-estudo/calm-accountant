# app/routes/__init__.py
# Mantém o namespace limpo e pronto para import manual no main.py
from .clients import router as clients_router
from .psychologists import router as psychologists_router
from .sessions import router as sessions_router
from .transactions import router as transactions_router

__all__ = [
    "clients_router",
    "psychologists_router",
    "sessions_router",
    "transactions_router"
]
