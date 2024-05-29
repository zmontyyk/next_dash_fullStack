import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import User from './app/models/Users';
import getMongoConnection from './app/lib/dbClient';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            // Set the token's expiration time
            const expirationTime = 10 * 24 * 60 * 60; // 10 days in seconds
            token.exp = Math.floor(Date.now() / 1000) + expirationTime;
            return token;
        },
        session: async ({ session, token }: { session: any; token: any }) => {
            // here we put session.useData and put inside it whatever you want to be in the session
            // here try to console.log(token) and see what it will have
            // sometimes the user get stored in token.user.userData
            // sometimes the user data get stored in just token.user
            session.user = token.user;
            session.jti = token.jti;
            session.expires = token.exp;
            return session;
        },
        // authorized: ({ auth, request: { nextUrl } }) => {
        //   const isLoggedIn = !!auth?.user;
        //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //   if (isOnDashboard) {
        //     return isLoggedIn;
        //   }
        //   if (isLoggedIn) {
        //     return Response.redirect(new URL('/dashboard', nextUrl));
        //   }
        //   return true;
        // },
    },
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
