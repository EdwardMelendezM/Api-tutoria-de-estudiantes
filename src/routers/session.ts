import { Router } from "express";
import {
  cancelateSession,
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
router.get("/getsessions/", getSessions);
router.get("/getsession/:id", getSession);
router.post("/createsession/", createSession);
router.put("/update/:id", updateSession);
router.put("/canceled/:id", cancelateSession);
router.delete("/delete/:id", deleteSession);

export { router };
