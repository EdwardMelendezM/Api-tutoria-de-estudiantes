import { Router } from "express";
import {
  createSession,
  deleteSession,
  getSession,
  getSessions,
  updateSession,
} from "../controllers/session";
const router = Router();

/**
 * Implementacion de reserva de estudiantes para tutoria
 */
router.get("/", getSessions);
router.get("/:id", getSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export { router };
