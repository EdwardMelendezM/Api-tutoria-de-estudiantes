import { Router } from "express";
import { login, register, updatePass, updatePhoto } from "../controllers/users";
import { checkJwt } from "../middleware/session";
import { validateRegister } from "../validators/users";

const router = Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

/**
 * Esta ruta solo se puede acceder si esta logeado el user
 */
router.put("/api/updatePass", checkJwt, updatePass);

router.put("/api/updatePhoto", checkJwt, updatePhoto);
export { router };
