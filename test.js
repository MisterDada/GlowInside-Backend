import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to connect:", error.message);
    process.exit(1);
  }
})();
