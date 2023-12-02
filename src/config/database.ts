import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('The MONGODB_URI must be defined in the .env file');
}

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    // Vous pouvez retourner le client ou la base de données ici si besoin
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
