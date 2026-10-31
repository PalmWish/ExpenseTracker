"use strict";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected Successfully!");
  } catch (error) {
    console.error("Mongo error:", error);
    throw error;
  }
};

export default connectDB;