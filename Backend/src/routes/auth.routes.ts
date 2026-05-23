import express from "express";
import {
  authDebug,
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/requireAuth";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.get("/", requireAuth, authDebug);

authRoutes.post("/refresh", refreshAccessToken);

export default authRoutes;
