from pydantic import BaseModel


class CalendarList(BaseModel):
    email: str
    calendar_names: list


class CalendarListRequest(BaseModel):
    email: str
