from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import task
from app.database import engine
from app.models import task as task_model

task_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://predixion-ai-assi.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router, prefix="/api")