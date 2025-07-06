import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.error(error + "Could not connect");
      });
  } catch (error) {
    console.error("Could not connect to db", error);
  }
};

export default connectDB;
