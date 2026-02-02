from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: EmailStr
    name: str | None = None
    bio: str | None = None

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: str | None = None
    bio: str | None = None
    email: EmailStr | None = None
