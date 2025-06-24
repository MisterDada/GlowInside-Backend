import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {type: String, unique: true, required: true},
    username: { type: String, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('user', userSchema);
