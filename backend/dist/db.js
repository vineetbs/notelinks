"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.Tag = exports.User = exports.Link = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const url = "mongodb+srv://vineet:vineet123@cluster0.t0w7x.mongodb.net/noteApp";
mongoose_2.default.connect(url).then(() => console.log("db connected"));
const userSchema = new mongoose_1.Schema({
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
const tagSchema = new mongoose_2.default.Schema({
    title: {
        type: String,
        required: true,
    },
});
const contentSchema = new mongoose_2.default.Schema({
    link: String,
    title: String,
    type: String,
    tags: [
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    userId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
const linkSchema = new mongoose_2.default.Schema({
    hash: String,
    userId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Link = mongoose_2.default.model("Link", linkSchema);
exports.User = mongoose_2.default.model("User", userSchema);
exports.Tag = mongoose_2.default.model("Tag", tagSchema);
exports.Content = mongoose_2.default.model("Content", contentSchema);
