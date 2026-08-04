import express from "express";
import {
  getAuthUser,
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/auth.controller";
import ensureDataConnection from "../middleware/ensureDataConnection";
import { requireAuth } from "../middleware/requireAuth";

const authRoutes = express.Router();
const middleware = [requireAuth, ensureDataConnection];

authRoutes.post("/signup", ensureDataConnection, signup);

authRoutes.post("/login", ensureDataConnection, login);

authRoutes.post("/logout", ensureDataConnection, logout);

authRoutes.get("/", middleware, getAuthUser);

authRoutes.post("/refresh", ensureDataConnection, refreshAccessToken);

export default authRoutes;
