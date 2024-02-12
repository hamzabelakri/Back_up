from fastapi import HTTPException, Request, status, APIRouter
from config.log_config import logger
from models.report_base_model import shift_report_row_response_model, shift_report_body_request_model,Shift_Report_Response,Report_Data_Model,Shift_Report_Body_Model
from api.report.report_mongo_model import Report_document, Order, Shift_Report, Shift_Report_Mongo_Document

report_router = APIRouter(tags=["REPORT_API"])

@report_router.get('/shift_report', response_model=list[Shift_Report_Body_Model])
async def get_table_data():
    try:
        
        documents = Shift_Report_Mongo_Document.objects()
        logger.info(f"Total reports: {len(documents)}")
        list_shift_report = [Shift_Report_Body_Model(**document.to_mongo()) for document in documents]
        return list_shift_report
    except Exception as ex:
        logger.error(f"Error: {ex}")
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

@report_router.post("/shift_report", response_model=Shift_Report_Body_Model)
async def add_table(table_body: Shift_Report_Body_Model):
    try:
        document = Shift_Report_Mongo_Document(**table_body.model_dump())
        document.save()
        return document
    except Exception as ex:
        logger.error(f"Error: {ex}")
        raise HTTPException(status_code=500, detail=f'Error: {ex}')

@report_router.get("/version",tags=["TEST_API"])
def xx():
    # I1 = Item(name="zvo", price=5000)
    # I1.save()
    # I1_id = I1.id
    # print(I1_id)
    # Order.objects(id='657c956409930d9b2d541ac4').update_one(push__items=I1)
    # o1 = Order(order_number='abcd')
    # o1.save()
    print(Order.objects.get(id='657c956409930d9b2d541ac4').to_mongo().to_dict())
    return 'mydict'


@report_router.get("/shift_reportt", response_model=list[shift_report_row_response_model],tags=["TEST_API"])
def shift_report(userid: int):
    try:
        documents = Report_document.objects(user=str(userid))
        logger.info(f'is={userid} found :{documents.count()} document')
        logger.debug(f'is={userid} found :{documents}')
        retlist = [shift_report_row_response_model(
            **document.to_mongo()) for document in documents]
    except Exception as Ex:
        raise HTTPException(status=500, details=f' error {Ex} ')
        # print('An exception occurred')
    logger.debug(f'is={userid} found :{documents.count()}')
    return retlist



