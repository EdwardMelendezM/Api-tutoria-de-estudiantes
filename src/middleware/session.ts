import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/requestExtend.interface";
import { handleHttp } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const data = verifyToken(`${jwt}`);
    console.log(data);
    req.user = data;
    next();
  } catch (error) {
    handleHttp(res, "SESION_NO_VALIDA");
  }
};

export { checkJwt };
