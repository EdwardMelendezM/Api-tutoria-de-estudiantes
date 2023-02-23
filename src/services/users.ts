import { Users } from "../interfaces/users.interface";
import UserModel from "../models/users";
import fs from "fs";
import { encrypt, verified } from "../utils/bcrypt.handle";

const registerUsuario = async (data: Users) => {
  try {
    const newdata = { ...data, password: encrypt(data.password) };
    const response = await UserModel.create(newdata);
    response.set("password", undefined, { strict: false });
    return response;
  } catch (error) {
    return "USER_EXISTS";
  }
};
const loginUser = async (data: Users) => {
  const { email, password } = data;
  const dataUser = await UserModel.findOne({ email });
  if (!dataUser) {
    return "ERROR_EMAIL";
  }
  const passBoolean = verified(password, dataUser.password);
  if (!passBoolean) return "ERROR_PASSWORD";
  dataUser.set("password", undefined, { strict: false });
  return dataUser;
};

const updatePassword = async (id: string, data: any) => {
  const { password, newPassword } = data;
  const user = await UserModel.findById(id);
  if (!user) {
    return "ERROR_ID_UPDATE_PASS";
  }
  const passBoolean = verified(password, user.password);
  if (!passBoolean) {
    return "ERROR_PASSWORD_UPDATE_PASS";
  } else {
    const passHash = encrypt(newPassword);

    const respuesta = await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          password: passHash,
        },
      },
      {
        new: true,
      }
    );
    return respuesta;
  }
};
const updatePhotoUser = async (data: any) => {
  const user = await UserModel.findById(data.id).select("photo");

  if (user?.photo !== undefined) {
    fs.unlinkSync(`${user?.photo}`);
  }
  const respuesta = await UserModel.findOneAndUpdate(
    {
      _id: data.id,
    },
    {
      $set: {
        photo: data.path,
      },
    },
    {
      new: true,
    }
  );

  return respuesta;
};
export { registerUsuario, loginUser, updatePassword, updatePhotoUser };
