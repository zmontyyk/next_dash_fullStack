import { MongoClient } from "mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: string = process.env.MONGODB_URI;
let mongoClient ;


if (!mongoClient ) {
 


  try {
    mongoClient  = new MongoClient(uri);
    await mongoClient .connect();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log(error,'MongoDB not connected');
  }

}
mongoClient;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export default mongoClient  as MongoClient;