from fastapi import HTTPException, APIRouter,File, UploadFile
from models.article_buttons_models import Article_Buttons_Add_Model, Article_Buttons_Body_Model
from config.log_config import logger
from api.article_buttons.buttons_mongo_model import  Button_Mongo_Model
import base64
import random,os

article_buttons_router = APIRouter(tags=["ARTICLE_BUTTONS_API"])

@article_buttons_router.get("/get_buttons_data", response_model=list[Article_Buttons_Body_Model])
def get_buttons_data(limit: int = 10):
    try:
        documents = Button_Mongo_Model.objects().limit(limit)
        logger.info(f"Total buttons: {len(documents)}")
        list_buttons = [Article_Buttons_Body_Model(id=str(document.id), **document.to_mongo()) for document in documents]
        return list_buttons
    except Exception as e:
        logger.error(f"Error in get_buttons_data: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@article_buttons_router.post("/add_button", response_model=Article_Buttons_Body_Model)
async def add_button(button: Article_Buttons_Add_Model, svg_filename: str):
    try:
        if not os.path.exists(f'./buttons/{svg_filename}'):
            logger.error(f"SVG file '{svg_filename}' not found")
            raise HTTPException(status_code=404, detail=f"SVG file '{svg_filename}' not found")

        with open(f'./buttons/{svg_filename}', "rb") as svg_file:
            svg_data = svg_file.read()

        svg_base64 = base64.b64encode(svg_data).decode("utf-8")
        button.img = f'data:image/svg+xml;base64,{svg_base64}'
        document = Button_Mongo_Model(**button.model_dump())
        document.save()
        button = Article_Buttons_Body_Model(id=str(document.id), **document.to_mongo())
        return button

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"SVG file '{svg_filename}' not found")
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


