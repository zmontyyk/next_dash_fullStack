import getMongoConnection from '@/app/lib/dbClient';
import Users from '@/app/models/Users';
import { NextResponse, NextRequest } from 'next/server';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';

const saltRounds = 10;

export const GET = auth(async function GET(req) {
    if (!req.auth)
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 },
        );

    await getMongoConnection();
    const usersList = await Users.find();
    return NextResponse.json(usersList);
});
export const POST = auth(async function GET(request) {
    if (!request.auth) return NextResponse.json({ message: 'Not authenticated' },{ status: 401 });

    const userData = await request.json();

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password
    const hash = await bcrypt.hash(userData.password, salt);

    try {
        await getMongoConnection();
        // checking user if alredy exists in db
        const checkUser = await Users.findOne({ email: userData.email });
        if (checkUser) {
            return new Response(
                JSON.stringify({
                    Message: 'user already exists',
                }),
                { status: 409 },
            );
        }

        // creating new user
        const newUser: any = new Users({ ...userData, password: hash });
        await newUser.save();
        return new Response(
            JSON.stringify({
                Message: 'user is created',
                newUser,
            }),
            { status: 201 },
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                Message: error._message,
            }),
            { status: 403 },
        );
    }
});
export const PATCH = auth(async function GET(request) {
    if (!request.auth) return NextResponse.json({ message: 'Not authenticated' },{ status: 401 });

    const body = await request.json();
    const { email, password, userId } = body;

    if (!email && !password) {
        return new Response(
            JSON.stringify({
                Message: 'please check credentials',
            }),
            { status: 403 },
        );
    }

    try {
        await getMongoConnection();
        if (!ObjectId.isValid(userId)) {
            return new Response(
                JSON.stringify({
                    Message: 'no user found',
                }),
                { status: 403 },
            );
        }

        const updateUser = await Users.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            {
                email: email,
                password: password,
            },
            { new: true },
        );
        return new Response(
            JSON.stringify({
                Message: 'user updated',
                updateUser,
            }),
            { status: 200 },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                Message: 'please check again',
            }),
            { status: 400 },
        );
    }
});
