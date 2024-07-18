from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(String, default="todo")
    created_at = Column(DateTime(timezone=True), server_default=func.now())