import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



export default NextAuth(authConfig).auth;


export function middleware(request: NextRequest) {
    let cookie = request.cookies.get("my-cookie")

    return NextResponse.redirect(new URL("/", request.url))

}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [],
};
