from fastapi.middleware.cors import CORSMiddleware
import fastapi
import uvicorn
from config.config import RELOAD, SERVER_HOST, SERVER_PORT, SERVER_WORKERS, UVICORN_LOG_LEVEL, ALLOWED_ORIGINS, ALLOWED_CREDENTIALS, ALLOWED_METHODS, LLOWED_HEADERS
from utils.startup import init
from api.user.user import user_router
from api.report.report_api import report_router
from api.websocket.websocket_api import websocket_router
from api.transaction.transaction_api import transaction_router
from api.config.config_api import config_router
from api.auth.operator_auth_api import operator_auth_router
from api.operator.operator_api import operator_router
from api.shift.shift_api import shift_router
from api.admin.admin_api import admin_router
from api.auth.admin_auth_api import admin_auth_router
from api.article_buttons.article_buttons_api import article_buttons_router
from api.control_button_actions.receipt.receipt_api import receipt_router
from api.control_button_actions.Barrier.barrier_api import barrier_router

def initialize_backend_application() -> fastapi.FastAPI:
    app = fastapi.FastAPI()  # type: ignore
    app.include_router(user_router)
    app.include_router(report_router)
    app.include_router(websocket_router)
    app.include_router(transaction_router)
    app.include_router(config_router)
    app.include_router(operator_auth_router)
    app.include_router(admin_auth_router)
    app.include_router(operator_router)
    app.include_router(admin_router)
    app.include_router(shift_router)
    app.include_router(article_buttons_router)
    app.include_router(receipt_router)
    app.include_router(barrier_router)
    app.add_middleware(CORSMiddleware,
                    allow_origins=ALLOWED_ORIGINS,
                    allow_credentials=ALLOWED_CREDENTIALS,
                    allow_methods=ALLOWED_METHODS,
                    allow_headers=LLOWED_HEADERS,
                    )

    # app.add_event_handler(
    #     "startup",
    #     execute_backend_server_event_handler(backend_app=app),
    # )
    # app.add_event_handler(
    #     "shutdown",
    #     terminate_backend_server_event_handler(backend_app=app),
    # )

    # app.include_router(router=api_endpoint_router, prefix=settings.API_PREFIX)
    return app


app: fastapi.FastAPI = initialize_backend_application()

if __name__ == "__main__":
    init()
    uvicorn.run(app="main:app",
                host=SERVER_HOST,
                port=SERVER_PORT,
                reload=RELOAD,
                workers=SERVER_WORKERS,
                log_level=UVICORN_LOG_LEVEL.lower(),
                )

