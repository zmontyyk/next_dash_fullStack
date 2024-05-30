// import mongoose from 'mongoose';

// const URL = process.env.MONGODB_URI as string;

// const connection: { isConnected?: Number } = {}

// async function getMongoConnection() {

//   if (connection.isConnected) {
//     console.log('db already connected');
//     const data = await Promise.resolve("some data")
//     return data
//   }

//   const db = await mongoose.connect(URL,{dbName:"next_full_stack"})

//   connection.isConnected = db.connections[0].readyState

// }

// export default getMongoConnection;


// lib/dbConnect.ts
import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // This keeps the global cache across hot reloads in development
  // @ts-ignore
  var mongoose: Cached;
}

let cached: Cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function getMongoConnection(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      dbName: "next_full_stack"
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('New database connection established');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default getMongoConnection;

