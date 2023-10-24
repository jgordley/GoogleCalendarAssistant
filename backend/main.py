from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from routers import user_routes, calendar_routes, event_routes, test_routes, chat_routes


app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()
app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(calendar_routes.router, prefix="/calendars", tags=["items"])
app.include_router(event_routes.router, prefix="/events", tags=["events"])
app.include_router(test_routes.router, prefix="/test", tags=["test"])
app.include_router(chat_routes.router, prefix="/chat", tags=["chat"])
