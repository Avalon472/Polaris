import express from "express";
import connectMongoDB from "./utils/connectDB";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
