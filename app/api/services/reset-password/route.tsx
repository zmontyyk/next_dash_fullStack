import getMongoConnection from '@/app/lib/dbClient';
import Users from '@/app/models/Users';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import { unstable_noStore as noStore } from 'next/cache';

export const GET = auth(async function GET(req) {
    if (!req.auth)
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 },
        );

    await getMongoConnection();
    const usersList = await Users.find();
    return NextResponse.json(usersList);
}) as any;
