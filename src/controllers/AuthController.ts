import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/User";
import { generateToken } from "../utils/generateToken";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    res.status(201).json({
      success: true,
      message: "User created successfully",
      ...userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    // Check if password match with the user passwor
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      ...userWithoutPassword,
    });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

export { register, login, logout };
