import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import User from './app/models/Users';
import getMongoConnection from './app/lib/dbClient';
import bcrypt from 'bcryptjs';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
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
    ],
});
