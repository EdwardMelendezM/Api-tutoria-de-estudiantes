import { model, Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    id_student: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    id_tutor: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    meeting: {
      type: String,
      required: true,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const SessionModel = model("users", SessionSchema);
export default SessionModel;
