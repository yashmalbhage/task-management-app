from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import  declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


# load_dotenv()
SQLALCHEMY_DATABASE_URL = "postgresql://Task_Management_owner:Fc6WBXZq4xTn@ep-polished-darkness-a1cw0mb8.ap-southeast-1.aws.neon.tech/Task_Management?sslmode=require"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()