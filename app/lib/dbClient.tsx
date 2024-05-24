import mongoose from 'mongoose';

// if (!process.env.MONGODB_URI) {
 
// }

const URL = process.env.MONGODB_URI as string;

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

