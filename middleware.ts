import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {    
    if (req.method === "OPTIONS") {
        return NextResponse.json({});
      }

    if (req.nextUrl.pathname.includes('/dashboard')) {
        if (!req.auth) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        return NextResponse.next()
    }
    if (req.nextUrl.pathname.includes('/login') && req.auth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)','/publicPages'],
};
