from fastapi import APIRouter

router = APIRouter()


@router.post("")
def ready_check():
    return {"status": "ok"}
