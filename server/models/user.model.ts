import mongoose, { Schema, Document } from "mongoose";

import { IProject } from "./project.model";

export interface IUser extends Document {
  nickname: string;
  name: string;
  bio: string;
  job: string;
  email: string;
  image: string;
  password: string;
  favorites: IUser[];
  projects: IProject;
}

const UserSchema: Schema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bio: { type: String },
    job: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<IUser>("User", UserSchema);
