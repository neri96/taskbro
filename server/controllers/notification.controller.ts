import { Request, Response } from "express";

import Notification from "../models/notification.model";

export const getAll = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const notifications = await Notification.find({ to: { $in: [id] } })
      .select("-updatedAt")
      .sort({
        createdAt: -1,
      });

    const notReadQty = await Notification.countDocuments({
      readBy: {
        $nin: [id],
      },
    });

    return res.status(202).json({ notifications, notReadQty });
  } catch (error) {
    console.log(error);
  }
};

export const read = async (req: Request, res: Response) => {
  const { notReadIds, userId } = req.body;

  try {
    const data = await Notification.updateMany(
      { _id: { $in: notReadIds } },
      { $push: { readBy: userId } }
    );

    return res.status(202).json(data);
  } catch (error) {
    console.log(error);
  }
};
