import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.events'

].join(' ');

dbConnect();

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl:
                'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            authorization: {
                params: {
                    scope: scopes
                }
            }
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            // if (account?.access_token) {
            //     try {
            //         // Find or create the user
            //         await User.findOneAndUpdate(
            //             { email: user.email },
            //             {
            //                 name: user.name,
            //                 email: user.email,
            //                 accessToken: account.access_token
            //             },
            //             { upsert: true }
            //         );
            //         console.log('User signed in:', user);
            //         return true;
            //     } catch (error) {
            //         console.error('Error updating user:', error);
            //         return false;
            //     }
            // }
            // return false;
            console.log('User signed in:', user);
        },
    },
    jwt: {
        encryption: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }