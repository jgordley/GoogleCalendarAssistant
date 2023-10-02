const BASE_URL = "http://localhost:8000";

export const fetchPrimaryCalendarEvents = async (email: string) => {
  const endpoint = `${BASE_URL}/calendars/primary/${encodeURIComponent(email)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch primary calendar. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchCalendarList = async (email: string) => {
  const endpoint = `${BASE_URL}/calendars/${encodeURIComponent(email)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchPrimaryChat = async (email: string) => {
  const endpoint = `${BASE_URL}/chat/primary/${encodeURIComponent(email)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch primary chat. Status: ${response.status}`);
  }

  return response.json();
};