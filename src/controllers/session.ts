import { Request, Response } from "express";

const createSession = async (req: Request, res: Response) => {
  res.send({ message: "OK" });
};
const getSessions = async (req: Request, res: Response) => {
  res.send({ message: "OK" });
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
