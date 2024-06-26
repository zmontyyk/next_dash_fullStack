"use sever";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// Notice this is only an object, not a full Auth.js instance
export default {
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }: { session: any; token: any }) => {
            // here we put session.useData and put inside it whatever you want to be in the session
            // here try to console.log(token) and see what it will have
            // sometimes the user get stored in token.user.userData
            // sometimes the user data get stored in just token.user
            session.user = token.user;
            delete session.user.password;
            return session;
        },
        authorized: ({ auth, request }) => {
            const isLoggedin = auth?.user;
            if (
                !isLoggedin &&
                request.nextUrl.pathname.includes("/dashboard")
            ) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
            if (isLoggedin && request.nextUrl.pathname.includes("/login")) {
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            }
            if (isLoggedin && request.nextUrl.pathname.includes("/singup")) {
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
