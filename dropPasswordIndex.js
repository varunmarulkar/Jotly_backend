import mongoose from "mongoose";
import UserModel from "./Models/User.model.js";
import dotenv from "dotenv"

dotenv.config()

const dropPasswordIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // apna DB URL

    // Drop the wrong Password_1 index
    await UserModel.collection.dropIndex("Password_1");
    console.log("✅ Dropped Password_1 index successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error dropping index:", err);
  }
};

dropPasswordIndex();
