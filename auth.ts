import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import User from './app/models/Users';
import getMongoConnection from './app/lib/dbClient';
import bcrypt from 'bcryptjs';
import authConfig from './auth.config';
import google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        // Set the token's expiration time
        maxAge: Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60, // 10 days in seconds;
    },
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials: any) {
                try {
                    const parsedCredentials = z
                        .object({
                            email: z.string().email(),
                            password: z.string(),
                        })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        await getMongoConnection();
                        const getUser = await User.findOne({
                            email: credentials.email,
                        });
                        const passwordsMatch = await bcrypt.compare(
                            credentials.password,
                            getUser.password,
                        );
                        if (passwordsMatch) {
                            return getUser;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
        google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
});
