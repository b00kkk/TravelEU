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