import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle";

const validateRegister = [
  check("name").exists().notEmpty().isLength({ min: 5, max: 150 }),
  check("email").exists().notEmpty().isEmail(),
  check("birthdate").exists().notEmpty().isDate(),
  check("password").exists().notEmpty().isLength({ min: 5, max: 15 }),
  check("role").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 5, max: 15 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateRegister, validateLogin };
