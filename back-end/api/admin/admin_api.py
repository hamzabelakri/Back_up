from fastapi import HTTPException, APIRouter
from config.log_config import logger
from models.admin_base_model import Admin_Body_Model
from api.auth.auth_mongo_model import Admin_Mongo_Document
from bson import ObjectId 

admin_router = APIRouter(tags=["ADMIN_API"])


@admin_router.get("/admin/", response_model=list[Admin_Body_Model])
async def get_all_admins():
    try:
        documents = Admin_Mongo_Document.objects()
        logger.info(f"Total Admins: {documents.count()}")
        admin_list = [Admin_Body_Model(id=str(document.id), **document.to_mongo()) for document in documents]
    except Exception as Ex:
        raise HTTPException(status=500, details=f' error {Ex} ')
    return admin_list


@admin_router.get("/admin/{admin_id}", response_model=Admin_Body_Model)
async def get_admin_by_id(admin_id: str):
    try:
        document = Admin_Mongo_Document.objects(id=ObjectId(admin_id)).first()

        if not document:
            raise HTTPException(status_code=404, detail='admin not found')
        admin = Admin_Body_Model(id=str(document.id), **document.to_mongo())
        return admin
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

