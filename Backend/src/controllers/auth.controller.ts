import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { issueTokens } from "../utils/loginTokens";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password } = req.body;

    //Match a string that has some non-space, non-@ characters,
    // followed by exactly one @, followed by more non-space,
    // non-@ characters, a dot, and more non-space, non-@ characters.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Email has already been used for an account" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    let errorMessage = null;

    switch (true) {
      case !emailRegex.test(email):
        errorMessage = "Invalid email format";
        break;

      case existingUser:
        errorMessage = "Username is already taken";
        break;

      case existingEmail:
        errorMessage = "Email is already in use";
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
      fullName: fullName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    //Validate object existence before saving it
    if (newUser) {
      //Save user in MongoDB and provide them with refresh token
      issueTokens(newUser.id, res);
      await newUser.save();

      //   //Status 201 implies something has been created
      //   res.status(201).json({
      //     _id: newUser._id,
      //     email: newUser.email,
      //     username: newUser.username,
      //   });

      const { password, ...userInfo } = newUser;

      res.status(201).json({ ...userInfo });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in signup controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
