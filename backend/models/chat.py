from pydantic import BaseModel


class ChatRequest(BaseModel):
    user_email: str
    user_message: str
    calendar_id: str


class ChatResponse(BaseModel):
    answer: str
