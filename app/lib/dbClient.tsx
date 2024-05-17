import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri:string = "mongodb+srv://admin_ai:Admin1234@cluster0.tdzqajf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!mongoClient) {
    try {
      mongoClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // Adjust timeout as needed
      });
      await mongoClient.connect();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB not connected', error);
      throw error; // Re-throw the error after logging it
    }
  }
  return mongoClient;
}

// Export a module-scoped promise for MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default getMongoClient;
