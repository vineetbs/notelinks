"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).json({
                message: "Bad request token not found",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.secret);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
            res.status(403).json({
                message: "Bad request userID not found",
            });
        }
        req.userId = decoded.id;
        return next();
    }
    catch (error) {
        res.status(411).json({
            message: "error",
        });
        console.log(error);
    }
};
exports.authMiddleware = authMiddleware;
