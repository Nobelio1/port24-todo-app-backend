import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  creatorUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

roomSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doct, ret, options) {
    delete ret._id;
  },
});

export const RoomModel = mongoose.model("Room", roomSchema);
