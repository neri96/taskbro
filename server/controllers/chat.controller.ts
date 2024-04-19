import { Request, Response } from "express";

import Chat from "../models/chat.model";
import Message from "../models/message.model";

import { setImgUrl } from "../utils/s3";

export const getChat = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const chat = await Chat.findOne({ id }).populate("members");

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
};

export const getNewPrivateMessages = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const messages = await Message.find({
      to: userId,
      read: false,
      isPrivate: true,
    })
      .populate("from", "id name nickname image")
      .limit(15)
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const images: any = {};

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const user = msg.from;
      const { _id } = user;

      if (images[String(_id)]) {
        user.image = images[_id];
      } else if (user.image) {
        await setImgUrl(user);
        images[_id] = user.image;
      }
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: chat } = req.query;
  console.log(chat);

  try {
    const messages = await Message.find({ chat })
      .populate("from", "id name nickname image")
      .limit(15)
      .sort({
        createdAt: -1,
      });

    const images: any = {};

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const user = msg.from;
      const { _id } = user;

      if (images[String(_id)]) {
        user.image = images[_id];
      } else if (user.image) {
        await setImgUrl(user);
        images[_id] = user.image;
      }
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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

    const images: any = {};
    const imgAssign = async (data: any) => {
      const { _id } = data;

      if (images[String(_id)]) {
        data.image = images[_id];
      } else if (data.image) {
        await setImgUrl(data);
        images[_id] = data.image;
      }
    };

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const userTo = msg.to;
      const userFrom = msg.from;

      await imgAssign(userTo);
      await imgAssign(userFrom);
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};
