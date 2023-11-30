from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse
from usecases import run_agent_executor

router = APIRouter()


@router.post("")
def get_calendars_list(chat_request: ChatRequest):
    try:
        answer = run_agent_executor(
            chat_request.user_email, chat_request.user_message, chat_request.calendar_id
        )
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
