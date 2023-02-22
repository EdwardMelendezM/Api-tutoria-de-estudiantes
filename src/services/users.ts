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

const updatePassword = async (data: any) => {
  const { password, newPassword, email } = data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return "ERROR_EMAIL_UPDATE_PASS";
  }
  const passBoolean = verified(password, user.password);
  if (!passBoolean) {
    return "ERROR_PASSWORD_UPDATE_PASS";
  } else {
    const { _id } = user;
    const passHash = encrypt(newPassword);
    const newUser = { ...user, password: passHash };
    const response = await UserModel.findOneAndUpdate({ _id }, newUser, {
      new: true,
    });
    return response;
  }
};
export { registerUsuario, loginUser, updatePassword };
