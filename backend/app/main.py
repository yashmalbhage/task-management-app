from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import task, auth
from app.database import engine
from app.models import task as task_model, user as user_model

task_model.Base.metadata.create_all(bind=engine)
user_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
      allow_origins=["https://predixion-ai-assi.vercel.app"], 
   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router, prefix="/api")
app.include_router(auth.router, prefix="/api")