from datetime import timedelta, datetime

from fastapi import APIRouter, HTTPException
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from domain.user import user_crud, user_schema
from domain.user.user_crud import pwd_context

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = '0fd875f49d39e67e28a83cb33aa530c31bc64bfad799ba1d3d8ad2dcf4fb7f2d'
ALGORITHM = "HS256"

router = APIRouter(
    prefix="/api/user",
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def user_create(_user_create: user_schema.UserCreate, db: Session = Depends(get_db)):
    user = user_crud.get_existing_user(db, user_create=_user_create)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="이미 존재하는 사용자입니다.")
    
    # 사용자 생성
    user_crud.create_user(db=db, user_create=_user_create)
    
    # 생성된 사용자 정보를 반환
    return {"id": _user_create.id, "gender": _user_create.gender, "age": _user_create.age}

@router.post("/login", response_model=user_schema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                           db: Session = Depends(get_db)):
    user = user_crud.get_user(db, form_data.username)

    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect id or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    data = {
        "sub": user.id,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "id": user.id
    }