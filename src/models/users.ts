import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    birthdate: {
      type: Date,
    },
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "tutor", "student"],
      required: true,
    },
    freetimeday: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const UserModel = model("users", UserSchema);
export default UserModel;
