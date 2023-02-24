import { Session } from "../interfaces/session.interface";
import SessionModel from "../models/session";

const createNewSession = async (data: Session) => {
  const newData = await SessionModel.create(data);
  return newData;
};
const getSessionAll = async () => {
  const data = await SessionModel.find()
    .populate("id_student")
    .populate("id_tutor");
  return data;
};

export { createNewSession, getSessionAll };
