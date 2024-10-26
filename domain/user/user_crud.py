from passlib.context import CryptContext
from sqlalchemy.orm import Session
from domain.user.user_schema import UserCreate
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user_create: UserCreate):
    db_user = User(id=user_create.id,
                   password=pwd_context.hash(user_create.password1),
                   gender=user_create.gender,
                   age=user_create.age)
    db.add(db_user)
    db.commit()

def get_existing_user(db: Session, user_create: UserCreate):
    return db.query(User).filter(
        (User.id == user_create.id) 
    ).first()

def get_user(db: Session, id: str):
    return db.query(User).filter(User.id == id).first()