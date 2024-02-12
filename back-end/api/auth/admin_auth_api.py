from fastapi import HTTPException, APIRouter
from config.log_config import logger
from models.admin_base_model import Admin_Register_Model, Admin_Login_Model, Admin_Logout_Model
from api.auth.auth_mongo_model import Admin_Mongo_Document
from mongoengine.errors import NotUniqueError

admin_auth_router = APIRouter(prefix='/auth/admin', tags=["ADMIN_AUTH_API"])

@admin_auth_router.post("/sign-up/", response_model=Admin_Register_Model)
async def create_admin(sign_up_body: Admin_Register_Model):
    try:
        admin = Admin_Mongo_Document(**sign_up_body.model_dump())
        admin.save()
    except NotUniqueError:
        raise HTTPException(status_code=400, detail="admin already exists")
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')
    return admin

@admin_auth_router.post("/sign-in/", response_model=Admin_Register_Model)
async def sign_in_admin(sign_in_body: Admin_Login_Model):
    try:
        email=sign_in_body.email
        password=sign_in_body.password
        admin = Admin_Mongo_Document.objects(email=email).first()
        if not admin:
            raise HTTPException(status_code=401, detail='admin not found')
        if not (email and password):
            raise HTTPException(status_code=401, detail='Invalid email or password')
    
        return admin
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')
    

""" @auth_router.post("/sign-out/", response_model=Operator_Logout_Model)
async def sign_out_operator(sign_out_body: Operator_Logout_Model):
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
        raise HTTPException(status_code=500, detail=f'Error: {ex}') """