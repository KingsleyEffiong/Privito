import { Schema, Document, models, model } from "mongoose";

export interface IDeposit {
  amount: number;
  date: Date;
  transactionId: string;
  receiptUrl: string;
}

export interface IInterestRecord {
  amountAdded: number;
  oldBalance: number;
  newBalance: number;
  appliedAt: Date;
}

export interface IUser extends Document {
  full_name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  role?: "user" | "admin";
  depositBalance: number;
  depositHistory: IDeposit[];
  interestHistory: IInterestRecord[]; // <-- New field to store interest changes
  lastInterestApplied?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const DepositSchema = new Schema<IDeposit>(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    transactionId: { type: String, required: true },
    receiptUrl: { type: String, required: true },
  },
  { _id: false }
);

const InterestRecordSchema = new Schema<IInterestRecord>(
  {
    amountAdded: { type: Number, required: true },
    oldBalance: { type: Number, required: true },
    newBalance: { type: Number, required: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    depositBalance: { type: Number, default: 0 },
    depositHistory: { type: [DepositSchema], default: [] },
    interestHistory: { type: [InterestRecordSchema], default: [] }, // <-- Here
    lastInterestApplied: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
