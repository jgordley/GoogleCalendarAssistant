import { sendChatMessage } from './chat_utils'

export async function POST(request: Request) {
  
  // Get user_email, user_message, calendar_id from req.body
  const { user_email, user_message, calendar_id } = await request.json();
  
  let apiResponse = await sendChatMessage(user_email, user_message, calendar_id);

  // Correctly create and return a new Response object
  return new Response(JSON.stringify({ apiResponse }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
