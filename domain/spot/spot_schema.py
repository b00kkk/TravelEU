from pydantic import BaseModel

class SpotBase(BaseModel):
    location_id: str
    attraction_name: str

class Spot(SpotBase):
    class Config:
        orm_mode = True