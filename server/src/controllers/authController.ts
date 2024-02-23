import { Request, Response } from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  const userExists = await User.findOne({ email });
  if (userExists) res.status(401).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();

    res.status(200).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid user data" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const accessToken = await jwt.sign(
          { _id: user._id },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );
        const refreshToken = await jwt.sign(
          { _id: user._id },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: "2h" }
        );
        res.cookie("accessToken", accessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.status(200).json({
          message: "login successful",
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid email & password" });
      }
    } else {
      res.status(400).json({ message: "No user found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const me = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken || "";
  const decodedToken: any = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  );

  const user = await User.findById(decodedToken.email);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
