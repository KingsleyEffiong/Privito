import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the schema
const UserSchema = new Schema<IUser>(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
