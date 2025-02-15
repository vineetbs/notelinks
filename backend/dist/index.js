"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utility_1 = __importDefault(require("./utility"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield db_1.User.create({ username: username, password: password });
        res.status(200).json({
            message: "user created",
        });
    }
    catch (error) {
        res.status(411).json({
            message: "user exists already",
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({
        username,
        password,
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.secret);
        res.status(200).json(token);
    }
    else {
        res.status(403).json({ message: "incorrect credentials" });
    }
}));
app.get("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.Content.find({
        userId: userId,
    }).populate("userId", "username");
    res.json(content);
}));
app.post("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title, type } = req.body;
    //@ts-ignore
    const userId = req.userId;
    yield db_1.Content.create({
        link,
        title,
        userId,
        type,
        tags: [],
    });
    res.json("content added");
}));
app.delete("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    yield db_1.Content.deleteMany({
        contentId,
        userId,
    });
    res.json("deleted");
}));
app.post("/api/v1/brain/share", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            });
        }
        const hash = (0, utility_1.default)(10);
        yield db_1.Link.create({
            //@ts-ignore
            userId: req.userId,
            hash,
        });
        res.json({
            hash,
        });
    }
    else {
        db_1.Link.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "link deleted",
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.Link.findOne({
        hash,
    });
    if (!link) {
        res.status(404).json({
            message: "incorrect link",
        });
        return;
    }
    const user = yield db_1.User.findOne({
        _id: link.userId,
    });
    const content = yield db_1.Content.findOne({
        userId: link.userId,
    });
    console.log(content);
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content,
    });
    return;
}));
app.listen(3000, () => console.log("server started"));
