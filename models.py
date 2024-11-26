from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    gender = Column(Integer, nullable=False)
    age = Column(Integer, nullable=False)

class Spot(Base):
    __tablename__ = "SPOT"

    location_id = Column(String)  # 지역명
    attraction_name = Column(String,primary_key=True)  # 관광지명

class Grade(Base):
    __tablename__ = "GRADE"

    id = Column(Integer, primary_key=True, autoincrement=True)  # ID 필드, 자동 증가
    attraction_name = Column(String, nullable=False)  # 관광지 명
    gender = Column(Integer, nullable=False)  # 성별 (예: 1 for male, 2 for female)
    age = Column(Integer, nullable=False)  # 나이
    relationship = Column(Integer, nullable=False)  # 관계 (예: 1 for alone, 2 for family etc.)
    rating = Column(Integer, nullable=False)  # 평점
    region = Column(String, nullable=False)  # 지역명