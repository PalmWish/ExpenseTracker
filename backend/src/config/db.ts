import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("Please define the MONGO_URI environment variable");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, {
                bufferCommands: false,
            })
            .then((m) => {
                console.log("Connected Successfully!");
                return m;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("Mongo error:", error);
        throw error;
    }

    return cached.conn;
};

export default connectDB;