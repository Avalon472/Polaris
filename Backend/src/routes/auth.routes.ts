import express from "express";
import {
  authDebug,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/", requireAuth, authDebug);

export default router;
