import requests
import json
from datetime import datetime, timedelta
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage


def get_calendar_events(user_id, calendar_id, start_time, end_time):
    # user = db.users.find_one({"email": event_list_request.email})

    # if user:
    #     access_token = user.get("access_token")
    #     # Determine the date range
    #     today = datetime.utcnow()
    #     one_month_later = today + timedelta(days=30)

    #     # Create the API endpoint
    #     endpoint = f"https://www.googleapis.com/calendar/v3/calendars/{event_list_request.calendar_id}/events"

    #     # Set the parameters
    #     params = {
    #         "timeMin": today.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
    #         "timeMax": one_month_later.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
    #     }

    #     # Set the headers
    #     headers = {
    #         "Authorization": f"Bearer {access_token}",
    #         "Accept": "application/json",
    #     }

    #     # Make the request
    #     response = requests.get(endpoint, headers=headers, params=params)
    #     events = response.json()

    #     # List the events
    #     event_list = []
    #     for event in events.get("items", []):
    #         start = event.get("start")
    #         date_info = start.get("date", start.get("dateTime"))
    #         event_list.append(f"{event.get('summary')}: {date_info}")

    return ["Birthday Party", "First Day of School", "Tom's Housewarming party"]


def convert_time(time_query):
    """Converts a natural language query into a python datetime call"""
    prompt = f'Convert the following time query into a python datetime start time:\n\n. {time_query} Please return a JSON formatted response with the following format: {{"time_function_call": <time_function_call>}}\n\n'
    chat = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")

    messages = [
        SystemMessage(
            content="You are a helpful assistant that only responds in valid JSON format, providing an interpretation of queries into python datetime calls."
        ),
        HumanMessage(content=prompt),
    ]
    result = chat(messages)
    # print(result)

    # # Parse the response JSON
    # result_json = json.loads(result[1].content)
    # print(result_json)

    # # Use exec to execute the time function call
    # result = exec(result_json["time_function_call"])
    # print(result)

    return result
