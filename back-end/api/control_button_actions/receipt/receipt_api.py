# from fastapi import FastAPI, APIRouter
# from pydantic import BaseModel

# receipt_router = APIRouter()

# class PrintRequest(BaseModel):
#     # Define any request body fields here
#     pass

# @receipt_router.post("/print-receipt")
# async def print_receipt(request_data: PrintRequest):
#     # Send back a response indicating the receipt has been printed
#     return {"message": "Receipt printed successfully"}


from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
import asyncio

receipt_router = APIRouter()

class PrintRequest(BaseModel):
    # Define any request body fields here
    pass

@receipt_router.post("/print-receipt")
async def print_receipt(request_data: PrintRequest):
    # Introduce a delay of 5 seconds (for example)
    await asyncio.sleep(1)
    # Send back a response indicating the receipt has been printed
    return {"message": "Receipt printed successfully"}

class Item(BaseModel):
    ArticleID: int
    lpn: str
    price: float
    carteType: str
    duration: str

# @receipt_router.post("/print-from-transaction-details")
# async def print_receipt(item: Item):
#     return {"message": "Receipt printed successfully"}  # You can customize the message as needed
@receipt_router.post("/print-from-transaction-details")
async def print_receipt(item: Item):
    # Process the item data as needed, e.g., print receipt
    return {"message": "Printed successfully"}
