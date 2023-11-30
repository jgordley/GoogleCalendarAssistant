from fastapi import APIRouter, Depends, HTTPException
from models import EventList, EventListRequest
from dependencies import get_db
from datetime import datetime, timedelta
import requests

router = APIRouter()

LIST_CALENDARS_ENDPOINT = "https://www.googleapis.com/calendar/v3/users/me/calendarList"


@router.post("/upcoming_month")
def get_calendars_list(event_list_request: EventListRequest, db=Depends(get_db)):
    user = db.users.find_one({"email": event_list_request.email})

    if user:
        access_token = user.get("access_token")
        # Determine the date range
        today = datetime.utcnow()
        one_month_later = today + timedelta(days=30)

        # Create the API endpoint
        endpoint = f"https://www.googleapis.com/calendar/v3/calendars/{event_list_request.calendar_id}/events"

        # Set the parameters
        params = {
            "timeMin": today.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "timeMax": one_month_later.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }

        # Set the headers
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
        }

        # Make the request
        response = requests.get(endpoint, headers=headers, params=params)
        print(response)
        print(response.text)
        response.raise_for_status()
        events = response.json()

        # List the events
        event_list = []
        for event in events.get("items", []):
            start = event.get("start")
            date_info = start.get("date", start.get("dateTime"))
            event_list.append(f"{event.get('summary')}: {date_info}")

        return EventList(email=event_list_request.email, events=event_list)
    else:
        raise HTTPException(status_code=404, detail="User not found")
