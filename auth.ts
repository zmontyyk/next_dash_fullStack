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
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    await getMongoConnection()
                    const getUser:any = await User.findOne({ email: credentials.email, password: credentials.email })
                    if (getUser) {
                        return {
                            email: getUser.email,
                            password: getUser.password
                        }
                    }
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
}


export const { auth, signIn, signOut } = NextAuth(authOptions);