import getMongoConnection from '@/app/lib/dbClient';
import Post from '@/app/models/Post';
import Users from '@/app/models/Users';
import { auth } from '@/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const POST = auth(async function (request) {
    await getMongoConnection();
    const postData = await request.json();
console.log(postData);

    try {

        // creating new post
        const newUser: any = new Post({ user: new ObjectId(postData.userId), ...postData });
        await newUser.save();
        return new Response(
            JSON.stringify({
                message: 'user created',
                status: 201,
            }),
            {
                status: 201,
                headers: { 'content-type': 'application/json' },
            },
        );
    } catch (error: any) {
        console.log(error,'owkdowkdwokdowkdwokdwok');
        return new Response(
            JSON.stringify({
                message: error._message,
            }),
            { status: 500 },
        );
    }
});
