import { Schema } from "mongoose";
import mongoose from "mongoose";

const url = "mongodb+srv://vineet:vineet123@cluster0.t0w7x.mongodb.net/noteApp";

mongoose.connect(url).then(() => console.log("db connected"));

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
