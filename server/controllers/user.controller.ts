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

export const getOne = async (req: Request, res: Response) => {
  const { nickname } = req.query;

  try {
    const user = await User.findOne({ nickname })
      .select("-password")
      .populate("favorites", "id name nickname image job bio");

    if (user?.image) {
      await setImgUrl(user);
    }

    if (user?.favorites)
      for (const fav of user.favorites) {
        if (fav.image) {
          await setImgUrl(fav);
        }
      }

    return res.status(202).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const edit = async (req: Request, res: Response) => {
  const { id, name, job, bio } = req.body;

  try {
    await User.updateOne({ _id: id }, { name, job, bio });

    return res.status(200).json("Data has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const modifyFavList = async (req: Request, res: Response) => {
  const { userId, favId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (user?.favorites.includes(favId)) {
      await user.updateOne({ $pull: { favorites: favId } });
    } else {
      await user?.updateOne({ $push: { favorites: favId } });
    }

    return res.status(200).json("Favorite has been added");
  } catch (error) {
    console.log(error);
  }
};

export const search = async (req: Request, res: Response) => {
  const { searchName } = req.query;

  try {
    const users = await User.find({
      nickname: { $regex: searchName, $options: "i" },
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

export const changeImage = async (
  req: TypedRequestBody<{ id: string }>,
  res: Response
) => {
  const { id } = req.body;

  try {
    if (req.file) {
      const imgName = crypto.randomBytes(32).toString("hex");

      await addFile(imgName, req.file.buffer, req.file.mimetype);

      await User.findByIdAndUpdate({ _id: id }, { image: imgName });

      return res.status(200).json("Successfully changed main image");
    }

    return res.status(400).json("Image change failed");
  } catch (error) {
    console.log(error);

    return res.status(500).json("Something went wrong, try again later");
  }
};
