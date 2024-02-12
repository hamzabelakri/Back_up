from fastapi import HTTPException, Request, status, APIRouter
from config.log_config import logger

user_router = APIRouter()

mydict = {"a": 1, 'g': 5}


@user_router.post("/version",tags=["TEST_API"])
async def read_root(request: Request):
    logger.info(f'Header:{request.headers.__dict__}')
    try:
        my_header = request.headers["Content-Type"]
    except Exception as ex:
        my_header = "application/json"
        logger.error(f'Error on getting header Content-Type :{ex}')

    if my_header != 'application/json':
        logger.warning(f'Content-Type :{my_header} is not application/json  ')
        # raise HTTPException(404, detail='Invalid request')
    print(my_header)
    return {"version": "1.0",
            "Description": "redis/postgres"}
