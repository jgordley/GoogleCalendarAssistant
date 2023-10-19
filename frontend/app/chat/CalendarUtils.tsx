const BASE_URL = "http://localhost:8000";

export const fetchPrimaryCalendarEvents = async (email: string, calendar_id: string) => {
  const endpoint = `${BASE_URL}/events/upcoming_month`;

  // Make a POST request to the endpoint with "email" and "calendar_id" in the body
  // {
  //   "email": "string",
  //   "calendar_id": "string"
  // }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, calendar_id })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch primary calendar. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchCalendarList = async (email: string) => {
  const endpoint = `${BASE_URL}/calendars`;

  // Make a POST request to the endpoint with "email" in the body
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

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