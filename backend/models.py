from sqlalchemy import Column, Integer, String
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    caption = Column(String)
    image = Column(String)
