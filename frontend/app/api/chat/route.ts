export const sendChatMessage = async (user_email: string, user_message: string, calendar_id: string) => {
  const BASE_URL = process.env.FASTAPI_URL;
  if (!BASE_URL) {
    console.error('FASTAPI_URL is not set');
    return { error: 'FASTAPI_URL is not set' }
  }
  
  const endpoint = `${BASE_URL}/chat`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_email, user_message, calendar_id })
  });

  if (!response.ok) {
    throw new Error(`Failed to send chat message. Status: ${response.status}`);
  }
  let responseAttrs = await response.json()
  console.log(responseAttrs);

  return responseAttrs;
};

export async function POST(request: Request) {
  
  // Get user_email, user_message, calendar_id from req.body
  const { user_email, user_message, calendar_id } = await request.json()
  
  let apiResponse = await sendChatMessage(user_email, user_message, calendar_id)

  return Response.json({ apiResponse })
}