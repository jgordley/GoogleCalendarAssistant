from fastapi import APIRouter, Depends, HTTPException
from models import CalendarList, CalendarListRequest
from dependencies import get_db
import requests

import logging

logger = logging.getLogger(__name__)

router = APIRouter()

LIST_CALENDARS_ENDPOINT = "https://www.googleapis.com/calendar/v3/users/me/calendarList"


@router.post("")
def get_calendars_list(calendar_list_request: CalendarListRequest, db=Depends(get_db)):
    user = db.users.find_one({"email": calendar_list_request.email})

    if user:
        access_token = user.get("access_token")
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(LIST_CALENDARS_ENDPOINT, headers=headers)

        response.raise_for_status()

        calendar_names = []
        for cal in response.json().get("items", []):
            calendar_names.append({cal.get("id"): cal.get("summary")})

        return CalendarList(
            email=calendar_list_request.email, calendar_names=calendar_names
        )
    else:
        raise HTTPException(status_code=404, detail="User not found")
