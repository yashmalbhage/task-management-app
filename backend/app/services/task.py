from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate

class TaskService:
    @staticmethod
    def get_tasks(db: Session, owner_id: int):
        return db.query(Task).filter(Task.owner_id == owner_id).all()

    @staticmethod
    def create_task(db: Session, task: TaskCreate, owner_id: int):
        db_task = Task(**task.dict(), owner_id=owner_id)
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def get_task(db: Session, task_id: int, owner_id: int):
        try:
            return db.query(Task).filter(Task.id == task_id, Task.owner_id == owner_id).one()
        except NoResultFound:
            return None

    @staticmethod
    def update_task(db: Session, task_id: int, task_update: TaskUpdate, owner_id: int):
        db_task = TaskService.get_task(db, task_id, owner_id)
        if db_task:
            for key, value in task_update.dict().items():
                setattr(db_task, key, value)
            db.commit()
            db.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(db: Session, task_id: int, owner_id: int):
        db_task = TaskService.get_task(db, task_id, owner_id)
        if db_task:
            db.delete(db_task)
            db.commit()
        return db_task
