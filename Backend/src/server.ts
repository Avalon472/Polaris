import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";

dotenv.config();

//Express server initialization
const app = express();
const PORT = Number(process.env.PORT) || 4000;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//CORS config
const corsOptions = {
  origin: "http://localhost:5173", // Allow only your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or auth headers if needed
};
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
