import getMongoConnection from "@/app/lib/dbClient";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";

export const GET = auth(async function GET(req) {
    if (!req.auth)
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        );

    const userDI:string = req.nextUrl.searchParams.get("userID") as string;

    try {
        await getMongoConnection();
        const userById = await Users.findOne({
            _id: new ObjectId(userDI),
        });
        return NextResponse.json({ userById, status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Somthing went wrong",
                status: 500,
            })
        );
    }
}) as any;
