import { Router } from "express";
import { login, register, updatePass } from "../controllers/users";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/api/updatePass", updatePass);
export { router };
