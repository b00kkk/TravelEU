from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from . import spot_crud

router = APIRouter(
    prefix="/api/spot",
)

@router.get("/spots")
def read_spots(location_id: str, db: Session = Depends(get_db)):
    spots = spot_crud.get_spots(db, location_id)
    return [{"attraction_name": spot.attraction_name} for spot in spots]