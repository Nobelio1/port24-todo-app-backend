import mongoose, { Schema } from "mongoose";

export enum States{
  PENDING = 0,
  INPROGRESS = 1,
  COMPLETED = 2
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  state: {
    type: Number,
    required: false,
    default: States.PENDING
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

todoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const TodoModel = mongoose.model("Todo", todoSchema);
