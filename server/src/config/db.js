import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn(
      "MONGODB_URI is not configured. Falling back to local JSON storage."
    );
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.info("Connected to MongoDB");
    return true;
  } catch (error) {
    console.warn(
      `MongoDB connection failed. Using local JSON storage instead. ${error.message}`
    );
    return false;
  }
}
