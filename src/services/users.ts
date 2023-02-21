import { Users } from "../interfaces/users.interface";
import UserModel from "../models/users";

const registerUsuario = async (data: Users) => {
  const response = await UserModel.create(data);
  return response;
};
const loginUser = async (data: Users) => {
  const { email, password } = data;
  const dataUser = await UserModel.findOne({ email });
  if (!dataUser) {
    return "ERROR_EMAIL";
  }
  if (password === dataUser.password) {
    return dataUser;
  }
  return "ERROR_PASSWORD";
};

export { registerUsuario, loginUser };
