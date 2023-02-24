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
      type: String,
      required: true,
    },
    duration: {
      type: String,
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
const SessionModel = model("session", SessionSchema);
export default SessionModel;
