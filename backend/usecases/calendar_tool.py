from typing import Type
from pydantic import BaseModel, Field
from langchain.tools import BaseTool
from usecases import get_calendar_events, convert_time


class CalendarEventSearchInput(BaseModel):
    """Inputs for get_calendar_events"""

    user_id: str = Field(description="User id of the user")
    calendar_id: str = Field(description="Calendar id of the calendar")
    start_date: str = Field(description="Start date of the event in datetime format")
    end_date: str = Field(description="End date of the event in datettime format")


class GetCalendarEventsTool(BaseTool):
    name = "get_calendar_events"
    description = """
        Useful when you want to get calendar events in a particular date or time range, requires python datetime object string inputs for the dates
        """
    args_schema: Type[BaseModel] = CalendarEventSearchInput

    def _run(self, user_id: str, calendar_id: str, start_date: str, end_date: str):
        events_response = get_calendar_events(
            user_id, calendar_id, start_date, end_date
        )
        return events_response

    def _arun(self, ticker: str):
        raise NotImplementedError("get_calendar_events does not support async")


class TimeConverterInput(BaseModel):
    """Inputs for time converter"""

    time_query: str = Field(description="The time to convert")


class TimeConverterTool(BaseTool):
    name = "convert_time"
    description = """
    Useful when you want to convert natural language time to a python datetime call
    """
    args_schema: Type[BaseModel] = TimeConverterInput

    def _run(self, time_query: str):
        formatted_datetime = convert_time(time_query)
        return formatted_datetime

    def _arun(self, ticker: str):
        raise NotImplementedError("conver_time does not support async")


# TODO: Set up a tool to convert natural language time to a datetime accepted by the google calendar api
