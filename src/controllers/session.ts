import { Request, Response } from "express";
import { createNewSession, getSessionAll } from "../services/session";
import { handleHttp } from "../utils/error.handle";

const createSession = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await createNewSession(data);
    res.send({ message: "OK", response });
  } catch (err) {
    console.log(err);

    handleHttp(res, "ERROR_CREATE_SESSION");
  }
};
const getSessions = async (req: Request, res: Response) => {
  const response = await getSessionAll();
  res.send({ message: "OK", response });
};
const getSession = (req: Request, res: Response) => {
  res.send({ message: "OK" });
};
const updateSession = (req: Request, res: Response) => {
  res.send({ message: "OK" });
};
const deleteSession = (req: Request, res: Response) => {
  res.send({ message: "OK" });
};

export { createSession, getSession, getSessions, updateSession, deleteSession };
