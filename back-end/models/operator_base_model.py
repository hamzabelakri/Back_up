from pydantic import BaseModel

class Operator_Body_Model(BaseModel):
    id: str
    name: str
    email: str
    password: str

class Operator_Register_Model(BaseModel):
    name: str
    email: str
    password: str

class Operator_Login_Model(BaseModel):
    email: str
    password: str

class Operator_Logout_Model(BaseModel):
    email: str
