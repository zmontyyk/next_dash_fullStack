import getMongoConnection from "@/app/lib/dbClient";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(async function GET(req: any) {
    
    if (!req.auth)
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        );

    try {
        await getMongoConnection();
        const followers = await Users.find({
            _id: { $in: req.auth?.user?.followers },
        });

        return NextResponse.json({ followers, status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Somthing went wrong",
                status: 500,
            })
        );
    }
}) as any;
