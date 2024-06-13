import getMongoConnection from '@/app/lib/dbClient';
import Users from '@/app/models/Users';
import { NextResponse, NextRequest } from 'next/server';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { unstable_noStore as noStore } from 'next/cache';
const saltRounds = 10;

export const GET = auth(async function GET(req) {
    console.log(req);
    
    if (!req.auth)
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 },
        );

    await getMongoConnection();
    const usersList = await Users.find();
    return NextResponse.json(usersList);
}) as any;



export const POST = auth(async function (request) {
    await getMongoConnection();
    const userData = await request.json();
    if (!userData) {
        return new Response(
            JSON.stringify({
                message: 'no data provided !',
            }),
            {
                status: 500,
                headers: { 'content-type': 'application/json' },
            },
        );
    }

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password
    const hash = await bcrypt.hash(userData.password, salt);

    try {
        // checking user if alredy exists in db
        const checkUser = await Users.findOne({ email: userData.email });
        if (checkUser) {
            return new Response(
                JSON.stringify({
                    message: 'user already exists',
                }),
                {
                    status: 500,
                    headers: { 'content-type': 'application/json' },
                },
            );
        }
        // creating new user
        const newUser: any = new Users({ ...userData, password: hash });
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
        return new Response(
            JSON.stringify({
                Message: error._message,
            }),
            { status: 500 },
        );
    }
});

export const PATCH = auth(async function (request) {
    const body = await request.json();
    let { userId, key, value } = body;

    if (!key || !value) {
        return new Response(
            JSON.stringify({
                message: 'please try again',
            }),
            { status: 403 },
        );
    }

    try {
        await getMongoConnection();
        if (!ObjectId.isValid(userId)) {
            return new Response(
                JSON.stringify({
                    message: 'no user found',
                }),
                { status: 403 },
            );
        }

        if (key === 'password') {
            // Generate salt
            const salt = await bcrypt.genSalt(saltRounds);
            // Hash the password
            value = await bcrypt.hash(value, salt);
        }

        // Construct the update object dynamically
        const updateObject: { [key: string]: any } = {};
        updateObject[key] = value;

         await Users.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: updateObject },
            { new: true },
        );

        return new Response(
            JSON.stringify({
                message: 'user updated',
                status: 201,
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'please check again',
            }),
            { status: 400 },
        );
    }
});
