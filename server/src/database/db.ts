import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  // const url = 'mongodb+srv://mohsin5595:bnox3MYHpP73jDl0@cluster0.d1hvaqi.mongodb.net/?retryWrites=true&w=majority'
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
export default Connection;
