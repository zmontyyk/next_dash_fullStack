import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const URL = process.env.MONGODB_URI;

if (!URL) {
  throw new Error("Please add your MongoDB URI to the .env file");
}

const mongoURL: string = URL as string;

export async function GET(req: NextRequest) {
  if (!mongoose.connections[0].readyState) {
    try {
      await mongoose.connect(mongoURL, {
        serverSelectionTimeoutMS: 5000,
      });
      return NextResponse.json({ message: 'Connected to MongoDB' });
    } catch (error) {
      return NextResponse.json({ error: 'Error connecting to MongoDB', details: error });
    }
  } else {
    return NextResponse.json({ message: 'Already connected to MongoDB' });
  }
}
