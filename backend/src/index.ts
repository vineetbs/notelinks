import express from "express";
import { Content, Link, User } from "./db";
import jwt from "jsonwebtoken";
import { secret } from "./config";
import { authMiddleware } from "./middleware";
import random from "./utility";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await User.create({ username: username, password: password });
    res.status(200).json({
      message: "user created",
    });
  } catch (error) {
    res.status(411).json({
      message: "user exists already",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json(token);
  } else {
    res.status(403).json({ message: "incorrect credentials" });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await Content.find({
    userId: userId,
  }).populate("userId", "username");
  res.json(content);
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const { link, title, type } = req.body;
  //@ts-ignore
  const userId = req.userId;
  await Content.create({
    link,
    title,
    userId,
    type,
    tags: [],
  });
  res.json("content added");
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  //@ts-ignore
  const userId = req.userId;
  await Content.deleteMany({
    contentId,
    userId,
  });
  res.json("deleted");
});

app.post("/api/v1/note/share", authMiddleware, async (req, res) => {
  //@ts-ignore

  const share = req.body.share;

  if (share) {
    const existingLink = await Link.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
    }
    const hash = random(10);
    await Link.create({
      //@ts-ignore
      userId: req.userId,
      hash,
    });

    res.json({
      hash,
    });
  } else {
    Link.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      message: "link deleted",
    });
  }
});

app.get("/api/v1/note/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;
  const link = await Link.findOne({
    hash,
  });
  if (!link) {
    res.status(404).json({
      message: "incorrect link",
    });
    return;
  }

  const user = await User.findOne({
    _id: link.userId,
  });

  const content = await Content.findOne({
    userId: link.userId,
  });

  console.log(content);

  res.json({
    username: user?.username,
    content: content,
  });
  return;
});

app.listen(3000, () => console.log("server started"));
