import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./user.model";

interface INotif extends Document {
  to: IUser[];
  message: string;
  readBy: IUser[];
}

const NotificationSchema: Schema = new Schema(
  {
    to: [{ type: Schema.Types.ObjectId, ref: "User" }],
    message: { type: String, required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

NotificationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<INotif>("Notification", NotificationSchema);
