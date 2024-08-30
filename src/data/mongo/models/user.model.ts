import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  role: {
    type: [String],
    enum: ["ADMIN_ROLE", "WORKER_ROLE"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  state: {
    type: Boolean,
    default: false,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: false, //todo: cambiar luego
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doct, ret, options) {
    delete ret._id;
  },
});

export const UserModel = mongoose.model("User", userSchema);
