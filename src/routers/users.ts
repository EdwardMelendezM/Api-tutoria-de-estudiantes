import { Router } from "express";
import { login, register, updatePass } from "../controllers/users";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post("/login", login);
router.post("/register", register);

/**
 * Esta ruta solo se puede acceder si esta logeado el user
 */
router.put("/api/updatePass", checkJwt, updatePass);
export { router };
