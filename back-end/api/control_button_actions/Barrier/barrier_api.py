from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import JSONResponse

barrier_router = APIRouter()

@barrier_router.post("/close-barrier")
async def close_barrier():
    try:
        # Logic for closing the barrier
        print("Close barrier button clicked")
        # Additional processing for closing the barrier
        return JSONResponse(content={"message": "Barrier closed successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@barrier_router.post("/open-barrier")
async def open_barrier():
    try:
        # Logic for opening the barrier
        print("Open barrier button clicked")
        # Additional processing for opening the barrier
        return JSONResponse(content={"message": "Barrier opened successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@barrier_router.post("/lock-barrier")
async def lock_barrier():
    try:
        # Logic for locking the barrier
        print("Lock barrier button clicked")
        # Additional processing for locking the barrier
        return JSONResponse(content={"message": "Barrier locked successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@barrier_router.post("/unlock-barrier")
async def unlock_barrier():
    try:
        # Logic for unlocking the barrier
        print("Unlock barrier button clicked")
        # Additional processing for unlocking the barrier
        return JSONResponse(content={"message": "Barrier unlocked successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
