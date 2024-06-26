import getMongoConnection from "@/app/lib/dbClient";
import Post from "@/app/models/Post";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";

export const GET = auth(async function (req) {
    if (!req.auth) {
        return new Response(
            JSON.stringify({
                message: "Not authenticated !",
                status: 500,
            })
        );
    }
    await getMongoConnection();
    const postData = await req.json();
    try {
        // creating new post
        const newPost: any = await Post.findById({
            _id: new ObjectId(postData),
        });
        return new Response(
            JSON.stringify({
                post: newPost,
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
