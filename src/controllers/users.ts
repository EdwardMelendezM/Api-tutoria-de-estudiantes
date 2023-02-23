import { Request, Response } from "express";
import { RequestExt } from "../interfaces/requestExtend.interface";
import {
  loginUser,
  registerUsuario,
  updatePassword,
  updatePhotoUser,
} from "../services/users";
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
    if (response === "USER_EXISTS") {
      throw new Error(response);
    }
    res.send({ message: "SUCCESSFUL_CREATED_NEW_USER", state: "OK" });
  } catch (error) {
    handleHttp(res, "USER_EXISTS", 404);
  }
};

const updatePass = async (req: RequestExt, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await updatePassword(id, data);

    res.send({ message: "SUCCESSFUL_UPDATE_PASS", state: "OK" });
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_PASSWORD");
  }
};

const updatePhoto = async (req: RequestExt, res: Response) => {
  try {
    const { user, file } = req;
    const updateNewPhoto = {
      id: `${user?._id}`,
      path: `${file?.path}`,
    };

    await updatePhotoUser(updateNewPhoto);

    res.send({ message: "SUCCESSFUL_UPDATE_PHOTO", state: "OK" });
  } catch (err) {
    console.log(err);

    handleHttp(res, "ERROR_UPDATE_PHOTO");
  }
};
export { login, register, updatePass, updatePhoto };
