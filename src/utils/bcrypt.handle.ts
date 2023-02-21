import { compareSync, hashSync } from "bcryptjs";

const encrypt = (password: string) => {
  return hashSync(password, 8);
};

const verified = (passPlane: string, passHash: string = "") => {
  return compareSync(passPlane, passHash);
};

export { encrypt, verified };
