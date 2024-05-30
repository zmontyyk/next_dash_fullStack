import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance
export default {
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
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {  
                return isLoggedIn;
            }
            if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        redirect({ url, baseUrl }) {
            // console.log(url);

            // Allows relative callback URLs
            // if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            // if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
