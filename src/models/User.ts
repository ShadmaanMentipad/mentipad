import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    googleName: String,
    displayName: String,
    image: String,
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
