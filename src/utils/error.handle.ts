import { Response } from "express";

const handleHttp = (res: Response, error: string, statusNum: number = 500) => {
  res.status(statusNum);
  res.send({ message: `${error}`, state: "NOT OK" });
};

export { handleHttp };
