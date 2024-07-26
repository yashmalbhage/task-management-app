from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services.task import TaskService
from app.routes.auth import get_current_user
from app.schemas.user import UserResponse

router = APIRouter()
@router.get("/tasks", response_model=list[Task])
def get_tasks(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    return TaskService.get_tasks(db, current_user.id)

@router.post("/tasks", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    return TaskService.create_task(db, task, current_user.id)

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    db_task = TaskService.update_task(db, task_id, task_update, current_user.id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found or not authorized")
    return db_task

@router.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    db_task = TaskService.delete_task(db, task_id, current_user.id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found or not authorized")
    return db_task
