import { MongoClient } from "mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;
let client;


if (!client) {
  client = new MongoClient(uri);
  await client.connect();
  console.log('MongoDB connected successfully');
}
 client;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export default client as MongoClient;