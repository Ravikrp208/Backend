import mongoose from "mongoose";
import dotenv, { config } from "dotenv";

const connectDB = async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log("MongoDB connected");
};

export default connectDB;
