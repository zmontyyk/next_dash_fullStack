import NextAuth, { NextAuthConfig } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import User from './app/models/Users';
import getMongoConnection from './app/lib/dbClient';

const authOptions: NextAuthConfig = {
    ...authConfig,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    await getMongoConnection()
                    const getUser = await User.findOne({ email: credentials.email, password: credentials.email })
                    return getUser
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
}


export const { auth, signIn, signOut } = NextAuth(authOptions);