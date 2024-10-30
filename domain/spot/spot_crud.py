from sqlalchemy.orm import Session
from models import Spot 

def get_spots(db: Session, location_id: str):
    return db.query(Spot).filter(Spot.location_id == location_id).all()