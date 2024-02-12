from pydantic import BaseModel

class Admin_Body_Model(BaseModel):
    id: str
    name: str
    email: str
    password: str

class Admin_Register_Model(BaseModel):
    name: str
    email: str
    password: str

class Admin_Login_Model(BaseModel):
    email: str
    password: str

class Admin_Logout_Model(BaseModel):
    email: str
