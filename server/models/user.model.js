import { model, Schema } from "mongoose";
import { roles } from "../constants/UserRoles.js";

const userSchema = Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    photoURL: { type: String },
    role: {
      type: String,
      required: true,
      enum: roles,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
