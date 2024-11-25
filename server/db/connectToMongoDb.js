import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { MONGODB_URI, MONGODB_NAME } = process.env;

export default async () => {
  try {
    mongoose.connect(MONGODB_URI, { dbName: MONGODB_NAME });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};
