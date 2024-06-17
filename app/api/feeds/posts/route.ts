import getMongoConnection from "@/app/lib/dbClient";
import Post from "@/app/models/Post";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = auth(async function (req) {
    if (!req.auth) {
        return new Response(
            JSON.stringify({
                message: "user not loged in!",
                status: 500,
            })
        );
    }
    await getMongoConnection();
    const postData = await req.json();
    try {
        // creating new post
        const newPost: any = new Post({
            user: new ObjectId(postData.userId),
            ...postData,
        });
        await newPost.save();
        return new Response(
            JSON.stringify({
                message: "new post created",
                status: 201,
            }),
            {
                status: 201,
                headers: { "content-type": "application/json" },
            }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: error._message,
            }),
            { status: 500 }
        );
    }
});

export const GET = auth(async (req:any) => {
    interface PostInterface {
        _id: mongoose.Types.ObjectId;
    }
    await getMongoConnection();
    
    // getting query params
    const limit =  req.nextUrl.searchParams.get('limit')
    console.log(limit);
    

    const countPost = await Post.find({
        user: new ObjectId(req?.auth?.user?._id),
    }).countDocuments();
    const posts: any = await Post.find({
        user: new ObjectId(req?.auth?.user?._id),
    })
        .populate("user")
        .select({ user: 0 })
        .lean()
        .limit(limit)
        .then((posts) =>
            posts.map((post) => {
                const typedPost = post as PostInterface; // Type assertion
                return {
                    ...typedPost,
                    _id: typedPost._id.toString(),
                };
            })
        );
    return new Response(
        JSON.stringify({
            posts: posts,
            totalPosts: countPost,
        }),
        { status: 500 }
    );
});
