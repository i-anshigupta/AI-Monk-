# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Union
import json
from sqlalchemy import create_engine, Column, Integer, JSON, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://aimonk-beta.vercel.app",
        "http://localhost:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./trees.db")
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Only SQLite needs check_same_thread: False
connect_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class TreeModel(Base):
    __tablename__ = "trees"
    id = Column(Integer, primary_key=True, index=True)
    tree_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)

class TreeCreate(BaseModel):
    tree_data: dict

class TreeUpdate(BaseModel):
    tree_data: dict

@app.get("/trees")
def get_trees():
    db = SessionLocal()
    trees = db.query(TreeModel).all()
    db.close()
    return trees

@app.post("/trees")
def create_tree(tree: TreeCreate):
    db = SessionLocal()
    db_tree = TreeModel(tree_data=tree.tree_data)
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    db.close()
    return db_tree

@app.put("/trees/{tree_id}")
def update_tree(tree_id: int, tree: TreeUpdate):
    db = SessionLocal()
    db_tree = db.query(TreeModel).filter(TreeModel.id == tree_id).first()
    if not db_tree:
        db.close()
        raise HTTPException(status_code=404, detail="Tree not found")
    db_tree.tree_data = tree.tree_data
    db_tree.updated_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(db_tree)
    db.close()
    return db_tree

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host=host, port=port)
