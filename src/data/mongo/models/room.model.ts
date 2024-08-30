import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  users: [
    {
      type: String,
    },
  ],
  todos: [
    {
      type: String,
    },
  ],
});

roomSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doct, ret, options) {
    delete ret._id;
  },
});

export const RoomSchema = mongoose.model("Room", roomSchema);
