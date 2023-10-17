from fastapi import APIRouter, Depends, HTTPException
from models import User, UserResponse
from dependencies import get_db


router = APIRouter()


@router.post("")
async def create_or_update_user(user: User, database=Depends(get_db)):
    user_doc = user.dict()
    result = database.users.find_one({"email": user.email})
    if result:
        database.users.update_one({"email": user.email}, {"$set": user_doc})
        return UserResponse(id=str(result["_id"]), email=user.email)
    else:
        result = database.users.insert_one(user_doc)
        return UserResponse(id=str(result.inserted_id), email=user.email)


@router.get("/{email}")
def get_user_by_email(email: str, database=Depends(get_db)):
    user = database.users.find_one({"email": email})
    if user:
        return {"id": str(user["_id"]), "access_token": user["access_token"]}
    else:
        raise HTTPException(status_code=404, detail="User not found")
