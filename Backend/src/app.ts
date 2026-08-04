import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

//Express server initialization
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//CORS config
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow only frontend as origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or auth headers if needed
};
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
