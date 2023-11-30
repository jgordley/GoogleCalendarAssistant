import GoogleProvider from 'next-auth/providers/google';

const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar',

].join(' ');

// Get URL from environment and alert if unset
const BASE_URL = process.env.FASTAPI_URL;
if (!BASE_URL) {
    console.error('FASTAPI_URL is not set');
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            checks: ['none'],
            authorizationUrl:
                'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            authorization: {
                params: {
                    scope: scopes
                }
            },
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            
            console.log('User signed in successfully: ', user.user.name);
            console.log('Access token: ', user.account.access_token.slice(0,5) + 'XXXXX');

            // Post to the FastAPI server with the user email, name, access token, and timestamp for latest login
            try {
                const endpoint = `${BASE_URL}/users`;
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user.user.email,
                        name: user.user.name,
                        access_token: user.account.access_token,
                        timestamp: new Date().toISOString()
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const responseData = await response.json();
                console.log('Response data: ', responseData);
                return true;
            } catch (error) {
                console.error('Error in POST request: ', error);
                return false;
            }
        }
    },
    jwt: {
        encryption: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
};