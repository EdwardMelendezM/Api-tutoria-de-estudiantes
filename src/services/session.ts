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
const getOneSession = async (id: string) => {
  const data = await SessionModel.findById(id);
  return data;
};
const updateOneSession = async (id: string, data: Session) => {
  const dataUpdated = await SessionModel.updateOne(
    {
      _id: id,
    },
    {
      ...data,
    },
    {
      new: true,
    }
  );
  return dataUpdated;
};
const deleteOneSession = async (id: string) => {
  const data = await SessionModel.deleteOne({ _id: id });
  return data;
};
const canceledSession = async (id: string) => {
  const data = await SessionModel.updateOne(
    {
      _id: id,
    },
    {
      canceled: true,
    }
  );
  return data;
};

export {
  createNewSession,
  getSessionAll,
  getOneSession,
  updateOneSession,
  deleteOneSession,
  canceledSession,
};
