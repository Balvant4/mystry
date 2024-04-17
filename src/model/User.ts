import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  Username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerify: boolean;
  isAcceptedMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  Username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      "please provide a valid email",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: {
    type: String,
    required: [true, "verifycode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Date is required"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAcceptedMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
