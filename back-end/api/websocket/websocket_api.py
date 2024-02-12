import json
from fastapi import APIRouter, WebSocket,WebSocketDisconnect, HTTPException
from websocket.websocket_manager import manager
import base64
from models.websocket_base_model import body_update_transaction_data_gui,empty_body_update_transaction_data_gui
import random,os

websocket_router=APIRouter(tags=["WEBSOCKET_API"])

@websocket_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            
            #await websocket_manager.send_message(f"Message from WebSocket: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@websocket_router.post("/update_transaction_data_gui")
async def update_transaction_data_gui(body: body_update_transaction_data_gui):
    print(type(body.model_dump_json()))
    await manager.send_message(body.model_dump_json())
    return body

@websocket_router.post("/update_transaction_data_gui2")
async def update_transaction_data_gui(body: body_update_transaction_data_gui):
    random_file=random.choice(os.listdir("./car-plates"))
    with open(f'./car-plates/{random_file}', "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode("utf-8")
    print("selected img : ",random_file)
    body.ticket_data.image=f'data:image/jpeg;base64,{image_data}'
    #print(type(body.model_dump_json()))
    await manager.send_message(body.model_dump_json())
    return {'sent successfully'}
    
@websocket_router.post("/empty_transaction_data_gui")
async def empty_transaction_data_gui(body: empty_body_update_transaction_data_gui):
    await manager.send_message(body.model_dump_json())
    return body

@websocket_router.get("/test_ink_status")
async def test_ink_status():

    try:
        message = {"ink_status": "ink_out"}
        await manager.send_message(json.dumps(message))
        return {"message": "Test ink status message sent"}
    except WebSocketDisconnect:
        raise HTTPException(status_code=500, detail="WebSocket is not connected")
