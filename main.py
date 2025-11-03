from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Calm Accountant API")
app.add_middleware(CORSMiddleware, allow_origins=["*"])

@app.get("/")
def root(): return {"message": "API Calm Accountant 🚀"}

@app.get("/health")
def health(): return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
