from pydantic import BaseModel

class Article_Buttons_Add_Model(BaseModel):
    img: str = "data:image/jpeg;base64,"
    title: str
    action: dict

class Article_Buttons_Body_Model(BaseModel):
    img: str
    title: str
    action: dict
    id: str