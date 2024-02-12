from fastapi import HTTPException, Request, status, APIRouter
from config.log_config import logger
from models.transaction_base_model import Ticket_Body_Model
from api.transaction.transaction_mongo_model import Entry_Ticket_Mongo_Document

from datetime import timedelta,datetime
import re
import base64
import random,os
import string
from fastapi import Query
from utils.datetime_generator import random_datetime_in_range

transaction_router = APIRouter()

@transaction_router.get("/transaction", response_model=list[Ticket_Body_Model],tags=["TRANSACTION_API"])
async def get_transaction_data():
    try:
        documents = Entry_Ticket_Mongo_Document.objects()
     
        transaction_list = [Ticket_Body_Model(id=str(document.id), **document.to_mongo()) for document in documents]
    except Exception as Ex:
        raise HTTPException(status=500, details=f' error {Ex} ')
        
    
    return transaction_list

@transaction_router.get("/transaction/", tags=["TRANSACTION_API"])
async def get_filtered_transaction_data(
    licence_plate: str = Query(None, alias="licence_plate"),
    start_date: datetime = Query(None, alias="start_Date"),
    end_date: datetime = Query(None, alias="end_Date"),
):
    try:
        print(start_date)
        print(end_date)
        query_params = {}

        if licence_plate:
            query_params["licence_plate__regex"] = f"^{re.escape(licence_plate)}"

        if start_date is not None and end_date is not None:
            
            query_params["entry_time__gte"] = start_date
            query_params["entry_time__lte"] = end_date

        documents = Entry_Ticket_Mongo_Document.objects(**query_params).order_by("+entry_time")
        print(documents.count())
        transaction_list = [Ticket_Body_Model(id=str(document.id),**document.to_mongo()) for document in documents]
        
        return transaction_list
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')




@transaction_router.get("/transaction/{transaction_id}", response_model=Ticket_Body_Model,tags=["TRANSACTION_API"])
async def get_one_transaction_data(transaction_id: str):
    try:
        
        document = Entry_Ticket_Mongo_Document.objects(id=transaction_id).first()

        if document:
            
            response_model_instance = Ticket_Body_Model(id=str(document.id), **document.to_mongo())
            return response_model_instance
        else:
            
            raise HTTPException(status_code=404, detail=f'Transaction with ID {transaction_id} not found')
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        
        raise HTTPException(status_code=500, detail=f'Error: {ex}')



@transaction_router.post("/transaction",tags=["TEST_API"])
async def add_transaction_data(RequestBody: Ticket_Body_Model, request: Request):
    try:
        random_file = random.choice(os.listdir("./car-plates"))
        with open(f'./car-plates/{random_file}', "rb") as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
        print("selected img : ", random_file)
        RequestBody.image = f'data:image/jpeg;base64,{image_data}'
        random_epan = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        random_plate = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        RequestBody.epan = random_epan
        RequestBody.licence_plate = random_plate
        RequestBody.entry_time = random_datetime_in_range("01/01/2023 00", "01/04/2024 04") 
        New_Document = Entry_Ticket_Mongo_Document(**RequestBody.model_dump())
        New_Document.save()
        response_model_instance = Ticket_Body_Model(**New_Document.to_mongo())
        return response_model_instance
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')


@transaction_router.put("/transaction/{transaction_id}",tags=["TRANSACTION_API"])
async def update_transaction_data(transaction_id: str, request_body: Ticket_Body_Model):
    try:
        
        existing_document = Entry_Ticket_Mongo_Document.objects(id=transaction_id).first()

        if existing_document:
            
            existing_document.modify(**request_body.model_dump())

            return f'Transaction with ID {transaction_id} updated successfully'
        else:
            raise HTTPException(status_code=404, detail=f'Transaction with ID {transaction_id} not found')

    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')



@transaction_router.delete("/transaction/{transaction_id}",tags=["TRANSACTION_API"])
async def delete_transaction_data(transaction_id:str):
    try:
        
        deleted_document = Entry_Ticket_Mongo_Document.objects(id=transaction_id).delete()
        
        if deleted_document:
            return f'Transaction with ID {transaction_id} deleted successfully'
        else:
            raise HTTPException(status_code=404, detail=f'Transaction with ID {transaction_id} not found')
            
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')