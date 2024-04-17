import { Request, Response } from "express";

import { validationResult } from "express-validator";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.model";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email }).populate("favorites");

    if (!user) {
      return res.status(400).json("User doesn't exist");
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) return res.status(404).json("Invalid credentials");

    const accessToken = jwt.sign(
      { id: String(user.id), nickname: user.nickname, email },
      process.env.ACCESS_SECRET_KEY as string,
      {
        expiresIn: "1min",
      }
    );

    const refreshToken = jwt.sign(
      { id: String(user.id), nickname: user.nickname, email },
      process.env.REFRESH_SECRET_KEY as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _pass, ...userData } = user.toObject();

    return res.status(200).json({
      user: { ...userData, id: userData._id },
      token: accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  const { nickname, name, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json("Organization already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      nickname,
      name,
      email,
      password: hashedPass,
    });

    await newUser.save();

    const accessToken = jwt.sign(
      { id: String(newUser.id), nickname, email },
      process.env.ACCESS_SECRET_KEY as string,
      {
        expiresIn: "1min",
      }
    );

    const refreshToken = jwt.sign(
      { id: String(newUser.id), nickname, email },
      process.env.REFRESH_SECRET_KEY as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _pass, ...userData } = newUser.toObject();

    return res.status(200).json({
      user: { ...userData, id: userData._id },
      token: accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.token)
      return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.token;

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY as string
    ) as jwt.JwtPayload;

    if (!decoded) return res.status(403).json({ message: "Forbidden" });

    const foundUser = await User.findOne({
      nickname: decoded.nickname,
    })
      .select("-createdAt -updatedAt -password -__v")
      .populate("favorites")
      .exec();

    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const { id: userId, nickname, email } = foundUser;

    const accessToken = jwt.sign(
      {
        id: String(userId),
        nickname,
        email,
      },
      process.env.ACCESS_SECRET_KEY as string,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      user: foundUser,
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json("Successfully logged out");
};
