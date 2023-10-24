import requests
import json
from datetime import datetime, timedelta
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from dependencies import get_db


def get_calendar_events(user_email, calendar_id, start_time, end_time):
    db = get_db()
    user = db.users.find_one({"email": user_email})

    if user:
        access_token = user.get("access_token")

        # Create the API endpoint
        endpoint = (
            f"https://www.googleapis.com/calendar/v3/calendars/{calendar_id}/events"
        )

        # Set the parameters
        params = {
            "timeMin": start_time,
            "timeMax": end_time,
        }

        # Set the headers
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
        }

        # Make the request
        response = requests.get(endpoint, headers=headers, params=params)
        events = response.json()

        # List the events
        event_list = []
        for event in events.get("items", []):
            start = event.get("start")
            date_info = start.get("date", start.get("dateTime"))
            event_list.append(f"{event.get('summary')}: {date_info}")

    return event_list
