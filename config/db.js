import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.error(error + "Could not connect");
      });
  } catch (error) {
    console.error("Could not connect to db", error)
  }
};

export default connectDB;
