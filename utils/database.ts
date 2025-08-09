import mongoose from "mongoose";
import { DB_URI } from "@/config/env";

const connectToDB = async () => {
  if (!DB_URI)
    throw new Error("Database URI not set in the environmental variable file");
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database via development environment`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectToDB;
