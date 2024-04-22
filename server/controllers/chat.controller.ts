import { Request, Response } from "express";

import Chat from "../models/chat.model";
import Message from "../models/message.model";

interface IGetNewPrivateMessages {
  userId: string;
  limit: number;
  fetchCount: number;
}

export const getChat = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const chat = await Chat.findOne({ id }).populate("members");

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getNewPrivateMessages = async (
  req: Request<{}, {}, {}, IGetNewPrivateMessages>,
  res: Response
) => {
  const { userId, limit, fetchCount } = req.query;

  try {
    const config = {
      to: userId,
      read: false,
      isPrivate: true,
    };

    const messages = await Message.find(config)
      .populate("from", "id name nickname image")
      .limit(15)
      .sort({
        createdAt: -1,
      })
      .limit(+fetchCount ? fetchCount * limit : limit);

    const total = await Message.countDocuments(config);

    return res.status(200).json({ messages, total });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const readPrivateMsgs = async (req: Request, res: Response) => {
  const { msgIds } = req.body;

  try {
    await Message.updateMany(
      { _id: msgIds },
      {
        $set: {
          read: true,
        },
      }
    );

    return res.status(200).json("Successfully read all the messages");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: chat } = req.query;

  try {
    const messages = await Message.find({ chat })
      .populate("from", "id name nickname image")
      .limit(15)
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const { chat, to, from, content, isPrivate } = req.body;

  try {
    const message = new Message({
      from,
      content,
    });

    if (isPrivate) {
      message.to = to;
      message.isPrivate = isPrivate;
    } else {
      message.chat = chat;

      await Chat.updateOne({ _id: chat }, { $push: { messages: message } });
    }

    await message.save();

    return res.status(200).json("Message has been sent");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPrivateMessages = async (req: Request, res: Response) => {
  const { from: userId, to: companionId } = req.query;

  try {
    const messages = await Message.find({
      to: { $in: [userId, companionId] },
      from: { $in: [userId, companionId] },
    })
      .populate("to", "id name nickname image")
      .populate("from", "id name nickname image")
      .limit(15)
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
