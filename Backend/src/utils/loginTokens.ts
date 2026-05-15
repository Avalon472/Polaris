import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Response } from "express";
import RefreshToken from "../models/refreshToken.model";
import mongoose from "mongoose";

export const signAccessToken = (userId: mongoose.Types.ObjectId): string => {
  return jwt.sign({ sub: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (): string => {
  return crypto.randomBytes(40).toString("hex");
};

export const issueTokens = async (
  userId: mongoose.Types.ObjectId,
  res: Response,
): Promise<string> => {
  const rawRefreshToken = generateRefreshToken();

  await RefreshToken.create({
    token: rawRefreshToken,
    userId,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days until expiry
  });

  res.cookie("refreshToken", rawRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //User https only in prod
    sameSite: "strict", //Prevent cross-site scripting attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return signAccessToken(userId);
};
