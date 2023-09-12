// utils/dbConnect.js
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};