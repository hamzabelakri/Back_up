from time import sleep
from fastapi import HTTPException, APIRouter
from config.log_config import logger
from models.shift_base_model import Shift_Body_Model,Shift_Transaction_Body_Model,Shift_Event_Body_Model,Shift_List_Transaction_Body_Model,Shift_List_Events_Body_Model
from api.shift.shift_mongo_model import Shift_Mongo_Document
from models.shift_base_model import Shift_In_Pause_Body_Model
from typing import List
from bson import ObjectId 
from websocket.websocket_manager import manager
from models.websocket_base_model import empty_body_update_transaction_data_gui
from datetime import datetime
import asyncio
shift_router = APIRouter(tags=["SHIFT_API"])

@shift_router.get("/shift", response_model=list[Shift_Body_Model])
async def get_all_shifts():
    try:
        documents = Shift_Mongo_Document.objects()
        logger.info(f"Total shifts: {len(documents)}")
        shifts = [Shift_Body_Model(id=str(document.id), **document.to_mongo()) for document in documents]
        return shifts
    except Exception as Ex:
        raise HTTPException(status_code=500, detail=f'Error: {Ex}')


@shift_router.get("/shift/{shift_id}", response_model=Shift_Body_Model)
async def get_shift_by_id(shift_id: str):
    try:
        document = Shift_Mongo_Document.objects(id=ObjectId(shift_id)).first()
        if not document:
            raise HTTPException(status_code=404, detail='shift not found')
        shift = Shift_Body_Model(id=str(document.id), **document.to_mongo())
        return shift
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')


@shift_router.put("/shift/add-transaction/{shift_id}", response_model=Shift_List_Transaction_Body_Model)
async def add_transaction_to_shift(shift_id: str, transaction_body: Shift_Transaction_Body_Model):
    try:
        document = Shift_Mongo_Document.objects(id=shift_id).first()
        if not document:
            raise HTTPException(status_code=404, detail=f'Shift not found')
        document.transactions.append(transaction_body.model_dump())
        document.save()
        transactions = Shift_List_Transaction_Body_Model(transactions=list((document.transactions)))
        asyncio.create_task(empty_transaction_data_gui())
        return transactions
    except HTTPException as http_ex:
        raise http_ex
    except Exception as Ex:
        raise HTTPException(status_code=500, detail=f'Error: {Ex}')

async def empty_transaction_data_gui():
    body= empty_body_update_transaction_data_gui()
    print(body)
    await manager.send_message(body.model_dump_json())


@shift_router.put("/shift/add-event/{shift_id}",response_model=Shift_List_Events_Body_Model)
async def add_event_to_shift(shift_id: str, event_body: Shift_Event_Body_Model):
    try:
        document = Shift_Mongo_Document.objects(id=shift_id).first()
        if not document:
            raise HTTPException(status_code=404, detail=f'Shift not found')
        event = f"{event_body.event} - {datetime.now()}"
        document.events.append(event)
        document.save()
        events = Shift_List_Events_Body_Model(events=list((document.events)))
        logger.info(f"Event added")
        return events
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

@shift_router.delete("/shift/")
async def delete_all_shifts():
    try:
        Shift_Mongo_Document.objects().delete()
        logger.info("All shifts deleted")
        return {"message": "All shifts deleted successfully"}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

@shift_router.get("/shifts-in-pause", response_model=List[Shift_In_Pause_Body_Model])
async def get_shifts_in_pause_not_resumed():
    try:
        shifts = Shift_Mongo_Document.objects(end_shift=None)
        shifts_in_pause = [Shift_In_Pause_Body_Model(id=str(document.id), **document.to_mongo()) for document in shifts]

        return shifts_in_pause
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error fetching shifts: {ex}')
