import { Schema } from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URL!;
try {
  mongoose.connect(url).then(() => console.log("db connected"));
} catch (e) {
  console.log(e);
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const contentSchema = new mongoose.Schema({
  link: String,
  title: String,
  type: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const linkSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Link = mongoose.model("Link", linkSchema);
export const User = mongoose.model("User", userSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Content = mongoose.model("Content", contentSchema);
