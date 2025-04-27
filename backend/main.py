from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
import shutil
import os

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files - Uploads
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")

# In-memory user storage (untouched)
users = []

class User(BaseModel):
    username: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

class PostOut(BaseModel):
    id: int
    username: str
    caption: str
    image: str

# ================== SQLITE CONFIG ==================
DATABASE_URL = "sqlite:///./posts.db"

Base = declarative_base()

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    caption = Column(String, nullable=False)
    image = Column(String, nullable=False)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ============== AUTH ROUTES (UNCHANGED) ===================

@app.post("/register")
def register(user: User):
    for u in users:
        if u.email == user.email:
            raise HTTPException(status_code=400, detail="User already exists")
    users.append(user)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: LoginUser):
    for u in users:
        if u.email == user.email and u.password == user.password:
            return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# ============== POSTS ROUTES ===================

@app.get("/posts", response_model=List[PostOut])
def get_posts():
    db = SessionLocal()
    posts = db.query(Post).all()
    db.close()
    return posts

@app.post("/upload-image")
async def upload_image(
    username: str = Query(...),
    caption: str = Query(...),
    file: UploadFile = File(...)
):
    file_location = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    image_url = f"http://localhost:8000/uploads/{file.filename}"

    db = SessionLocal()
    new_post = Post(username=username, caption=caption, image=image_url)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    db.close()

    return {"message": "Post uploaded", "post": {
        "id": new_post.id,
        "username": new_post.username,
        "caption": new_post.caption,
        "image": new_post.image,
    }}
