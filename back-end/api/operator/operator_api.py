from fastapi import HTTPException, APIRouter
from config.log_config import logger
from models.operator_base_model import Operator_Body_Model
from api.auth.auth_mongo_model import Operator_Mongo_Document
from bson import ObjectId 

operator_router = APIRouter(tags=["OPERATOR_API"])


@operator_router.get("/operator/", response_model=list[Operator_Body_Model])
async def get_all_operators():
    try:
        documents = Operator_Mongo_Document.objects()
        logger.info(f"Total Operators: {documents.count()}")
        operator_list = [Operator_Body_Model(id=str(document.id), **document.to_mongo()) for document in documents]
    except Exception as Ex:
        raise HTTPException(status=500, details=f' error {Ex} ')
    return operator_list


@operator_router.get("/operator/{operator_id}", response_model=Operator_Body_Model)
async def get_operator_by_id(operator_id: str):
    try:
        document = Operator_Mongo_Document.objects(id=ObjectId(operator_id)).first()

        if not document:
            raise HTTPException(status_code=404, detail='Operator not found')
        operator = Operator_Body_Model(id=str(document.id), **document.to_mongo())
        return operator
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

