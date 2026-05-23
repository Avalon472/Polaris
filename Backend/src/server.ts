import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";
import connectMongoDB from "./utils/connectDB";

dotenv.config();

//Express server initialization
const app = express();
const PORT = Number(process.env.PORT) || 4000;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
