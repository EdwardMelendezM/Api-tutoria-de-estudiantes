import { Users } from "../interfaces/users.interface";
import UserModel from "../models/users";
import { encrypt, verified } from "../utils/bcrypt.handle";

const registerUsuario = async (data: Users) => {
  try {
    const newdata = { ...data, password: encrypt(data.password) };
    const response = await UserModel.create(newdata);
    return response;
  } catch (error) {
    return "ERROR_REGISTER";
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
  return dataUser;
};

export { registerUsuario, loginUser };
