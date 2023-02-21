import { Request, Response } from "express";
import { loginUser, registerUsuario } from "../services/users";
import { handleHttp } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await loginUser(data);
    if (response === "ERROR_EMAIL" || response === "ERROR_PASSWORD") {
      handleHttp(res, response);
    } else {
      const token = await generateToken(response);
      res.send({ token, response });
    }
  } catch (error) {
    handleHttp(res, "ERROR_LOGIN_USER");
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await registerUsuario(data);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_REGISTER");
  }
};

export { login, register };
