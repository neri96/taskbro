import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import crypto from "crypto";

import { setImgUrl } from "../utils/s3";

import User from "../models/user.model";

import { addFile } from "../utils/s3";

interface TypedRequestBody<ReqBody> extends Request {
  body: ReqBody;
}

export const me = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.token) return res.status(401).json("Unauthorized");

    const refreshToken = cookies.token;

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY as string
    ) as jwt.JwtPayload;

    if (!decoded) return res.status(403).json("Forbidden");

    const foundUser = await User.findOne({
      nickname: decoded.nickname,
    })
      .select("-createdAt -updatedAt -password -__v")
      .populate("favorites")
      .exec();

    if (!foundUser) return res.status(401).json("Unauthorized");

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

    if (foundUser.image) {
      await setImgUrl(foundUser);
    }

    return res.status(200).json({
      user: foundUser,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const search = async (req: Request, res: Response) => {
  const { searchName } = req.query;
  try {
    const users = await User.find({
      name: { $regex: searchName, $options: "i" },
    }).select("-password");

    for (const user of users) {
      if (user.image) {
        await setImgUrl(user);
      }
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};
