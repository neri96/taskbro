import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./user.model";
import { IMessage } from "./message.model";

export interface IChat extends Document {
  members: IUser[];
  messages: IMessage[];
}

const ChatSchema: Schema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

ChatSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<IChat>("Chat", ChatSchema);
