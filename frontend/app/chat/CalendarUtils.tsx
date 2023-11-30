export const fetchCalendarList = async (email: string) => {
  // Endpoint is now the internal API route
  const endpoint = `/api/calendars`;

  // Make a POST request to the internal API route with "email" in the body
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

export const sendChatMessage = async (user_email: string, user_message: string, calendar_id: string) => {
  // Inside your component or utility function
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_email, user_message, calendar_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  let result = await response.json();

  return result.apiResponse;
}