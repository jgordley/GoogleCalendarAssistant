from fastapi import APIRouter
from usecases import run_agent_test

router = APIRouter()


@router.post("")
async def run_langchain_test():
    run_agent_test()
