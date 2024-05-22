
import mongoose from 'mongoose';
import { NextRequest,NextResponse } from 'next/server';

const URL:string = "mongodb+srv://admin_ai:Admin1234@cluster0.tdzqajf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


export async function GET(req: NextRequest) {
  if (!mongoose.connections[0].readyState) {
    try {
      await mongoose.connect(URL, {
       
        serverSelectionTimeoutMS: 5000
      });
     return NextResponse.json({ message: 'Connected to MongoDB' });
    } catch (error) {
    return  NextResponse.json({ error: 'Error connecting to MongoDB', details: error });
    }
  } else {
   return NextResponse.json({ message: 'Already connected to MongoDB' });
  }
}