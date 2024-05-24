import getMongoConnection from "@/app/lib/dbClient";
import Users from "@/app/models/Users";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";



export async function GET() {

    try {

        await getMongoConnection()
        const usersList = await Users.find()

        return NextResponse.json(usersList)
    } catch (error) {

    }

}


export async function POST(request: Request) {
    const userData = await request.json()
    try {
        await getMongoConnection()
        const newUser: any = new Users(userData)
        await newUser.save()
        return new Response(JSON.stringify({
            Message: "user is created",
            newUser
        }), { status: 201 })

    } catch (error: any) {
        return new Response(JSON.stringify({
            Message: error._message
        }), { status: 403 })
    }


}


export async function PATCH(request: Request) {

    const body = await request.json()
    const { email, password, userId } = body

    if (!email && !password) {
        return new Response(JSON.stringify({
            Message: "please check credentials",
        }), { status: 403 })
    }

    try {

        if (!ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({
                Message: "no user found",
            }), { status: 403 });
        }

        const updateUser = await Users.findOneAndUpdate({ _id: new ObjectId(userId) }, {
            email: email,
            password: password,
        }, { new: true })
        return new Response(JSON.stringify({
            Message: "user updated",
            updateUser,
        }), { status: 200 })


    } catch (error) {
        return new Response(JSON.stringify({
            Message: "please check again",
        }), { status: 400 })
    }



}