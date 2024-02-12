from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Ticket_Body_Model(BaseModel):
    id : Optional[str] = None
    image : str = "data:image/jpeg;base64,"
    epan : str
    licence_plate : str
    card_type : str
    entry_unit : str
    entry_time : datetime
    duration_stay : str
    

