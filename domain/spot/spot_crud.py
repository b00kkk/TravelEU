from sqlalchemy.orm import Session
from models import Spot, Grade

def get_spots(db: Session, location_id: str):
    return db.query(Spot).filter(Spot.location_id == location_id).all()

def get_recommended_spots(db: Session, region: str, gender: int, age: int, relationship: int):
    age_lower = age - 5  # 연령 하한
    age_upper = age + 5  # 연령 상한
    return db.query(Grade).filter(
        Grade.region == region,
        Grade.gender == gender,
        Grade.age.between(age_lower, age_upper),
        Grade.relationship == relationship
    ).order_by(Grade.rating.desc()).limit(5).all() 