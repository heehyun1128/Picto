import mongoose, { Mongoose } from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;

interface Connection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: Connection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDB = async () => {
  if (!MONGODB_URL) {
    throw new Error("Invalid or missing MongoDB URL.");
  }
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, { dbName: "Picto", bufferCommands: false });
  cached.conn = await cached.promise;

  return cached.conn;
};
