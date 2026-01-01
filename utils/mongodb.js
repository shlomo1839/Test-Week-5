import { MongoClient } from "mongodb";

const MONGO_URL =
  "mongodb://admin:password123@localhost:27018/products?authSource=admin";
const DB_NAME = "encript";
const COLLECTION_NAME = "users";

let mongocClient = null;
let mongoConn = null;

// creating init to mongodb
export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);

    const usersCollection = mongoConn.collection(COLLECTION_NAME);
    await usersCollection.createIndex({ name: 1 }, { unique: true });
    await mongocClient.close();
    mongocClient=null
    mongoConn=null;
    
  } catch (error) {
    console.error("Error init database:", error);
    throw error;
  }
}

export async function getMongoDbConnection() {
  if (mongoConn === null) {
    if (mongocClient === null) {
      mongocClient = new MongoClient(MONGO_URL);
    }
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}
