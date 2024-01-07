import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./user.model";
import { IChat } from "./chat.model";

export interface IProject extends Document {
  uid: string;
  title: string;
  description: string;
  deadline: number;
  manager: IUser;
  team: IUser[];
  tasks: {
    _id: string;
    task: string;
    completed: boolean;
  }[];
  files: {
    title: string;
    fileName: string;
    fileType: string;
  }[];
  chat: IChat;
  completed: boolean;
}

const ProjectSchema: Schema = new Schema(
  {
    uid: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Number, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [
      {
        task: { type: String, required: true },
        completed: { type: Boolean, required: true, default: false },
      },
    ],
    files: [
      {
        title: { type: String, required: true },
        fileName: { type: String, required: true },
        fileType: { type: String, required: true },
      },
    ],
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<IProject>("Project", ProjectSchema);
