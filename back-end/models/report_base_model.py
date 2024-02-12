from pydantic import BaseModel
from typing import Literal
from typing import List, Dict


class shift_report_row_response_model(BaseModel):
    user: int
    shift: int
    transactions: str
    lpn: str = "NOLPN"
    # carteType: Literal['cardtype1', 'cardtype2']
    cardtype: str = 'None'

class shift_report_body_request_model(BaseModel):
    userid: int
    shiftid: int
    transaction: str
    lpn: str = "NOLPN"
    # carteType: Literal['cardtype1', 'cardtype2']
    carteType: str = 'None'

class Shift_Body_Model(BaseModel):
    transaction: list
    events: list

class Report_Data_Model(BaseModel):
    ArticleID: int
    lpn: str
    price: float
    carteType: str
    duration: str

class Shift_Report_Body_Model(BaseModel):
    header_part: dict
    data: List[Report_Data_Model]

class Shift_Report_Response(BaseModel):
    header_part: Dict[str, int]
    data: List[Report_Data_Model]    

class Report_Register_Body_Model(BaseModel):
    header_part: dict
    data: Report_Data_Model