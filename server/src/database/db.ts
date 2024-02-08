import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Succesfully");
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};
export default Connection;
