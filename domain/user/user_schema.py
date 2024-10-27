from pydantic import BaseModel, field_validator
from pydantic_core.core_schema import FieldValidationInfo

class UserCreate(BaseModel):
    id: str
    password1: str
    password2: str
    gender: int
    age: int

    @field_validator('id', 'password1', 'password2', 'gender', 'id')
    def not_empty(cls, v):
        if not v or (isinstance(v, str) and not v.strip()) or (isinstance(v, int) and v == 0):
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v

    @field_validator('password2')
    def passwords_match(cls, v, info: FieldValidationInfo):
        if 'password1' in info.data and v != info.data['password1']:
            raise ValueError('비밀번호가 일치하지 않습니다')
        return v

class Token(BaseModel):
    access_token: str
    token_type: str
    id: str