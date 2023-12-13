from fastapi import APIRouter

router = APIRouter()


@router.post("")
def health_check():
    return {"status": "ok"}
