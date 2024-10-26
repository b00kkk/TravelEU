from sqlalchemy import Column, Integer, String

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    gender = Column(Integer, nullable=False)
    age = Column(Integer, nullable=False)