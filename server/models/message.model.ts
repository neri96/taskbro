import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./user.model";
import { IChat } from "./chat.model";

export interface IMessage extends Document {
  chat: IChat;
  to: IUser;
  from: IUser;
  content: string;
}

const MessageSchema: Schema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

MessageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
