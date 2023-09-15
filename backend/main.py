from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from pymongo import MongoClient
from config import settings

app = FastAPI()


class UserIn(BaseModel):
    email: str
    name: str
    access_token: str
    timestamp: str


class UserOut(UserIn):
    id: str


client = MongoClient(settings.mongodb_url)
db = client[settings.database_name]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users", response_model=UserOut)
async def create_or_update_user(user: UserIn = Body(...)):
    user_doc = user.dict()
    result = db.users.find_one({"email": user.email})
    if result:
        db.users.update_one({"email": user.email}, {"$set": user_doc})
        return {"id": str(result["_id"]), "email": result["email"]}
    else:
        result = db.users.insert_one(user_doc)
        return {"id": str(result.inserted_id), "email": result["email"]}


@app.get("/users/{email}", response_model=UserOut)
def get_user_by_email(email: str):
    user = db.users.find_one({"email": email})
    if user:
        return {**user, "id": str(user["_id"])}
    else:
        raise HTTPException(status_code=404, detail="User not found")
