import getMongoConnection from "@/app/lib/dbClient";
import Users from "@/app/models/Users";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";

export const GET = auth(async function GET(req: any) {
    if (!req.auth)
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 },
        );

        try {
            await getMongoConnection();
            const followers = await Users.find({
                _id: { $in: req.auth?.user?.followers },
            })
            

            return NextResponse.json(followers);
        } catch (error) {
            return new Response(
                JSON.stringify({
                    message: "Somthing went wrong",
                    status: 500,
                })
            );
        }
   
}) as any;
 