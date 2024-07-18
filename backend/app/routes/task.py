from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services.task import TaskService

router = APIRouter()

@router.get("/alltasks", response_model=list[Task])
def get_tasks(db: Session = Depends(get_db)):
    return TaskService.get_tasks(db)

@router.post("/Createtasks", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    return TaskService.create_task(db, task)

@router.put("/updatetasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    db_task = TaskService.update_task(db, task_id, task_update)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/Deletetask/{task_id}", response_model=Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = TaskService.delete_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task