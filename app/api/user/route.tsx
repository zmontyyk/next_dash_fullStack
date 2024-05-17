import { NextResponse, NextRequest } from "next/server";
import getMongoClient from "@/app/lib/dbClient";


export async function GET() {
    const client = await getMongoClient()
    if (!client) {
        return NextResponse.json("Failed to connect to DB")
    }

    // db name
    const db = client.db("next_full_stack");

    // collection name 
    const usersCollection = db.collection('users');

    // query
    const result = await usersCollection.find().toArray();


    return NextResponse.json({ result })

}

export async function POST(req: NextRequest) {
    const data12 = await req.json()


    const data = {
        id: 1,
        name: "monty"
    }

    return new NextResponse(JSON.stringify({
        hello: "oiqhoihqw"
    }))

}