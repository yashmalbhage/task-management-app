from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class Task(Base):
    __tablename__ = "tasksl"
    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(String, default="todo")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship("User", back_populates="tasks")