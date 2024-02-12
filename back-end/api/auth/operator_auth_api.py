from fastapi import HTTPException, APIRouter
from config.log_config import logger
from models.operator_base_model import Operator_Register_Model,Operator_Login_Model,Operator_Logout_Model,Operator_Body_Model
from api.auth.auth_mongo_model import Operator_Mongo_Document
from api.shift.shift_mongo_model import  Shift_Mongo_Document
from models.shift_base_model import Shift_List_Events_Body_Model, Shift_Event_Body_Model, Shift_Pause_Body_Model
from datetime import datetime
from mongoengine.errors import NotUniqueError

operator_auth_router = APIRouter(prefix='/auth/operator', tags=["AUTH_API"])


@operator_auth_router.post("/sign-up", response_model=Operator_Register_Model)
def create_operator(sign_up_body: Operator_Register_Model):
    try:
        operator = Operator_Mongo_Document(**sign_up_body.model_dump())
        operator.save()
    except NotUniqueError:
        raise HTTPException(status_code=400, detail="operator already exists")
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')
    return operator

@operator_auth_router.post("/sign-in", response_model=Operator_Body_Model)
async def sign_in_operator(sign_in_body: Operator_Login_Model):
    try:
        email = sign_in_body.email
        password= sign_in_body.password
        operator = Operator_Mongo_Document.objects(email=email,password=password).first()
        if not operator:
            raise HTTPException(status_code=401, detail='Invalid email or password')
        open_shift = Shift_Mongo_Document.objects(email=email, end_shift=None).first()

        if open_shift:
            shift_id = open_shift.id
            if any("pause" in event for event in open_shift.events):
             resume_event = f"resume - {datetime.now()}"
             open_shift.events.append(resume_event)
             open_shift.save()

        else:
            shift_id = create_shift_document(email=email)
        logger.info(f'Operator:{operator.name} shift_id:{shift_id}')
        return Operator_Body_Model(id=str(shift_id),**operator.to_mongo())
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

    
def create_shift_document(email: str):
    shift_document = Shift_Mongo_Document(start_shift = datetime.now(),email = email)
    shift_document.save()
    return str(shift_document.id)


@operator_auth_router.post("/sign-out/", response_model=Operator_Logout_Model)
def sign_out_operator(sign_out_body: Operator_Logout_Model):
    try:
        email=sign_out_body.email
        operator = Operator_Mongo_Document.objects(email=email).first()
        if not operator:
            raise HTTPException(status_code=404, detail='operator not found')
        shift_document = Shift_Mongo_Document.objects(email=email, end_shift=None).first()
        if shift_document:
            shift_document.end_shift = datetime.now()
            shift_document.save()
        return operator
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')
    

@operator_auth_router.put("/pause-shift/{shift_id}", response_model=Shift_List_Events_Body_Model)
async def pause_shift(shift_id: str, pause_body:Shift_Pause_Body_Model):
    try:
        shift_document = Shift_Mongo_Document.objects(id=shift_id, end_shift=None).first()
        if not shift_document:
            raise HTTPException(status_code=404, detail='Shift document not found')
        pause_event = f"{pause_body.pause} - {datetime.now()}"
        shift_document.events.append(pause_event)
        shift_document.save()
        events = Shift_List_Events_Body_Model(events=list((shift_document.events)))
        logger.info(f"paused shift")
        return events
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')


@operator_auth_router.put("/resume-shift", response_model=str)
def resume_shift(resume_body: Operator_Logout_Model):
    try:
        email = resume_body.email
        shift_document = Shift_Mongo_Document.objects(email=email, end_shift=None).first()
        if not shift_document:
            raise HTTPException(status_code=400, detail='Shift not found')

        if shift_document.end_shift:
            raise HTTPException(status_code=400, detail='Shift is already signed out')

        if shift_document.pause_resume_times:
            if "resume" in shift_document.pause_resume_times[-1]:
                raise HTTPException(status_code=400, detail='Shift is already resumed')
            shift_document.pause_resume_times[-1]["resume"] = datetime.now()
        else:
            raise HTTPException(status_code=400, detail='No pause time recorded')

        shift_document.end_shift = None
        shift_document.save()

        return shift_document
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')



