const { MongoClient } = require('mongodb')
import nextConnect from 'next-connect';
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '.env') });
const uri = process.env.MONGODB_URI;


const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;


module.exports = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('MongoDB connected successfully');
  }
  return client;
}


