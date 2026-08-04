import { NextFunction, Request, Response } from "express";
import connectMongoDB from "../utils/connectDB";

const ensureDataConnection = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await connectMongoDB();
    next();
  } catch {
    res
      .status(500)
      .json({ error: "Connection failed: Unable to connect to MongoDB." });
  }
};

export default ensureDataConnection;
