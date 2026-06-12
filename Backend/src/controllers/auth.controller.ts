import bcrypt from "bcrypt";
import { Request, Response } from "express";
import RefreshToken from "../models/refreshToken.model";
import User from "../models/user.model";
import { issueTokens, signAccessToken } from "../utils/loginTokens";

//Match a string that has some non-space, non-@ characters,
// followed by exactly one @, followed by more non-space,
// non-@ characters, a dot, and more non-space, non-@ characters.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username: username });

    const existingEmail = await User.findOne({ email: email });

    let errorMessage = null;

    switch (true) {
      case !emailRegex.test(email):
        errorMessage = "Invalid email format";
        break;

      case !!existingEmail:
        errorMessage = "Email is already in use";
        break;

      case !!existingUser:
        errorMessage = "Username is already taken";
        break;

      case password.length < 8:
        errorMessage = "Password must be at least 8 characters long";
        break;
    }

    if (errorMessage) {
      return res.status(400).json({
        error: errorMessage,
      });
    }

    //Generate salt for password hashing
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user entry from validated information
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //Validate object existence before saving it
    if (newUser) {
      //Save user in MongoDB and provide them with refresh token
      await newUser.save();
      const accessToken = await issueTokens(newUser._id, res);

      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in signup controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = emailRegex.test(usernameOrEmail)
      ? await User.findOne({ email: usernameOrEmail })
      : await User.findOne({ username: usernameOrEmail });
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || "",
    );

    if (!user || !correctPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Return cookie and user information if credentials Match
    const accessToken = await issueTokens(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      accessToken: accessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in login controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Delete refresh token from DB
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in logout controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuthUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in authDebug controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ error: "No refresh token" });
  }

  const stored = await RefreshToken.findOne({ token });

  if (!stored || stored.expiresAt < new Date()) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }

  const newAccessToken = signAccessToken(stored.userId);
  return res.status(200).json({ accessToken: newAccessToken });
};
