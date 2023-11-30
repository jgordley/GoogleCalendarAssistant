import GoogleProvider from 'next-auth/providers/google';

const BASE_URL = "http://localhost:8000";

let signIn = async (user, account, profile) => {
    
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