import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as unknown as { sub: string };
    req.userId = new mongoose.Types.ObjectId(payload.sub);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
