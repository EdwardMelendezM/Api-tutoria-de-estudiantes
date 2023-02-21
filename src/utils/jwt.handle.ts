import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token010101";

const generateToken = async (user: any) => {
  const { _id, role } = user;
  const jwt = sign({ _id, role }, JWT_SECRET, { expiresIn: "2h" });
  return jwt;
};

const verifyToken = (jwt: string) => {
  return verify(jwt, JWT_SECRET);
};

export { generateToken, verifyToken };
