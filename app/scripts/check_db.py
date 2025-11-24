from app.database.connection import engine
from sqlalchemy import text

print('Engine URL:', engine.url)
try:
    with engine.connect() as conn:
        res = conn.execute(text('select 1'))
        print('Test OK, result:', res.scalar())
except Exception as e:
    print('Connection test failed:', e)
