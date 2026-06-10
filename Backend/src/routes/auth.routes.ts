import express from "express";
import {
  getAuthUser,
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

authRoutes.get("/", requireAuth, getAuthUser);

authRoutes.post("/refresh", refreshAccessToken);

export default authRoutes;
