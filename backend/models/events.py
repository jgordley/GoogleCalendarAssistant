from pydantic import BaseModel


class EventList(BaseModel):
    email: str
    events: list


class EventListRequest(BaseModel):
    email: str
    calendar_id: str
