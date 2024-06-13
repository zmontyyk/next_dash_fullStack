import getMongoConnection from '@/app/lib/dbClient';
import Post from '@/app/models/Post';
import { auth } from '@/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const POST = auth(async function (request) {
    if (!request.auth) {
        return new Response(
            JSON.stringify({
                message: 'user not loged in!',
                status: 500,
            }),
        );
    }
    await getMongoConnection();
    const postData = await request.json();
    try {
        // creating new post
        const newPost: any = new Post({
            user: new ObjectId(postData.userId),
            ...postData,
        });
        await newPost.save();
        return new Response(
            JSON.stringify({
                message: 'new post created',
                status: 201,
            }),
            {
                status: 201,
                headers: { 'content-type': 'application/json' },
            },
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: error._message,
            }),
            { status: 500 },
        );
    }
});
