from pydantic import BaseModel
from typing import List
from bson import ObjectId
from datetime import datetime

class Shift_Body_Model(BaseModel):
    id: str 
    operator_id: int = None
    start_shift: datetime
    end_shift: datetime = None
    transactions: List[dict]
    events: List[str]
    zr_shift_id : int = None
    shift_sync_zr: bool 
    shift_sync_back_office : bool 
    
class Payment_Model(BaseModel):
    article_id: str
    amount_paid: float
    payment_type: str
    ticket_type: str
    zr_produce_syn: bool= False
    zr_flow_sync: bool= False
    back_office_synch: bool= False
    print_status: bool= False

class Shift_Transaction_Body_Model(BaseModel):
    action_time: str
    ticket_price: float
    licence_plate: str
    epan: str
    entry_time: str
    duration_stay: str
    card_type: str
    image: None
    payments: List[Payment_Model]

class Shift_List_Transaction_Body_Model(BaseModel):
    transactions: List

class Shift_Event_Body_Model(BaseModel):
    event: str

class Shift_Pause_Body_Model(BaseModel):
    pause: str 

class Shift_List_Events_Body_Model(BaseModel):
    events: List

class Shift_In_Pause_Body_Model(BaseModel):
    id: str 
    operator_id: int = None
    start_shift: datetime
    end_shift: datetime = None
    transactions: List[dict]
    events: List[str]
    zr_shift_id : int = None
    shift_sync_zr: bool 
    shift_sync_back_office : bool 
    email: str 
