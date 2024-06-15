import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, User } from "../models/userModel";

const JWT_SECRET = "your_jwt_secret";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = await UserModel.createUser({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User | null = await UserModel.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
