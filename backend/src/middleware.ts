import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret } from "./config";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({
        message: "Bad request token not found",
      });
    }
    const decoded = jwt.verify(token as string, secret) as JwtPayload;
    if (!decoded?.id) {
      res.status(403).json({
        message: "Bad request userID not found",
      });
    }
    req.userId = decoded.id;
    return next();
  } catch (error) {
    res.status(411).json({
      message: "error",
    });
    console.log(error);
  }
};
