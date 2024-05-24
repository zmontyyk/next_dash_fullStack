import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const URL: string = process.env.MONGODB_URI;

const connection: { isConnected?: Number } = {}

async function getMongoConnection() {

  if (connection.isConnected) {
    console.log('db already connected');

    return
  }

  const db = await mongoose.connect(URL,{dbName:"next_full_stack"})

  connection.isConnected = db.connections[0].readyState

}

export default getMongoConnection;

