import { Request, Response } from "express";
import {
  createNewSession,
  getOneSession,
  getAllSession,
  updateOneSession,
  deleteOneSession,
  canceledSession,
} from "../services/session";
import { handleHttp } from "../utils/error.handle";

const createSession = async (req: Request, res: Response) => {
  try {
    const newData = req.body;
    const data = await createNewSession(newData);
    res.send({ message: "OK", data });
  } catch (err) {
    console.log(err);

    handleHttp(res, "ERROR_CREATE_SESSION");
  }
};
const getSessions = async (req: Request, res: Response) => {
  try {
    const data = await getAllSession();
    res.send({ message: "OK", data });
  } catch (err) {
    handleHttp(res, "ERROR_GET_SESSIONS");
  }
};
const getSession = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await getOneSession(id);
    res.send({ message: "OK", data });
  } catch (err) {
    handleHttp(res, "ERROR_GET_SESSIONS");
  }
};
const updateSession = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const data = await updateOneSession(id, newData);
    res.send({ message: "OK", data });
  } catch (err) {
    handleHttp(res, "ERROR_UPDATE_SESSION");
  }
};
const deleteSession = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await deleteOneSession(id);
    res.send({ message: "OK", data });
  } catch (err) {
    handleHttp(res, "ERROR_DELETE_SESSION");
  }
};
const cancelateSession = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await canceledSession(id);
    res.send({ message: "OK", data });
  } catch (err) {
    handleHttp(res, "ERROR_CANCELED_SESSION");
  }
};

export {
  createSession,
  getSession,
  getSessions,
  updateSession,
  deleteSession,
  cancelateSession,
};
