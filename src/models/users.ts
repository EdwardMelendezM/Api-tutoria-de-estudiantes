import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "userPremium"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const UserModel = model("users", UserSchema);
export default UserModel;
