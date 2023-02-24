import { Router } from "express";
import { login, register, updatePass, updatePhoto } from "../controllers/users";
import multerMiddleware from "../middleware/file";
import { checkJwt } from "../middleware/jwt";
import { validateLogin, validateRegister } from "../validators/users";

const router = Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);

/**
 * Estas rutas solo ser accedidas si el usuario esta logeado
 */
router.put("/updatePass/:id", checkJwt, updatePass);
router.put(
  "/updatePhoto",
  checkJwt,
  multerMiddleware.single("myFile"),
  updatePhoto
);
export { router };
