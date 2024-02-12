from fastapi import HTTPException, Query, APIRouter

config_router = APIRouter(tags=["CONFIG_API"])


@config_router.get('/lrgeometry')
async def get_lrgeometry_data():
    return ([
        {"name":"ZR1","id":7001,"ip":"12.112.12.12","port":"8084","pos":[
            {"id":801,"name":"pos801"},{"id":802,"name":"pos802"},{"id":803,"name":"pos803"}
            ]
            },
             {"name":"ZR2","id":7002,"ip":"12.112.12.12","port":"8085","pos":[
            {"id":804,"name":"pos804"},{"id":805,"name":"pos805"},{"id":806,"name":"pos806"}
            ]},
             {"name":"ZR3","id":7003,"ip":"12.112.12.12","port":"8086","pos":[
            {"id":807,"name":"pos807"},{"id":808,"name":"pos808"},{"id":809,"name":"pos809"}
            ]},
    ])



full_saved_data={
    "serverip":"127.0.0.1","serverport":"8000",
    "lrgeometry":[
        {"name":"ZR1","id":7001,"ip":"12.112.12.12","port":"8084", "selected":True,"pos":[
            {"id":801,"name":"pos801","selected":True},{"id":802,"name":"pos802"},{"id":803,"name":"pos803"}
            ]
            },
             {"name":"ZR2","id":7002,"ip":"12.112.12.12","port":"8085","pos":[
            {"id":804,"name":"pos804"},{"id":805,"name":"pos805"},{"id":806,"name":"pos806"}
            ]},
             {"name":"ZR3","id":7003,"ip":"12.112.12.12","port":"8086","pos":[
            {"id":807,"name":"pos807"},{"id":808,"name":"pos808"},{"id":809,"name":"pos809"}
            ]},
    ] }


@config_router.get('/local/config')
async def get_localconfig():
    return (full_saved_data)

@config_router.post('/local/config')
async def post_data(request_data: dict):
    try:
        print("Request Body:",request_data)
        return "Saved Successfully"
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f'Error: {ex}')
