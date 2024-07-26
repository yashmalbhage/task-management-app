from fastapi import APIRouter, Depends, HTTPException, status, Request, Response, Form
from sqlalchemy.orm import Session
from app.schemas.user import User, UserCreate
from app.services.User import UserService
from app.database import get_db

router = APIRouter()


sessions = {}

def authenticate_user(db: Session, username: str, password: str):
    user = UserService.get_user_by_username(db, username)
    if not user or user.password != password:
        return False
    return user

@router.post("/login")
def login(
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    session_id = str(user.id)
    sessions[session_id] = user
    response.set_cookie(key="session_id", value=session_id)
    return {"message": "Login successful"}

@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserService.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return UserService.create_user(db, user)

def get_current_user(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id is None or session_id not in sessions:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    user = sessions[session_id]
    return user

@router.get("/users/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
