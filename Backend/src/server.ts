import express from "express";
import connectMongoDB from "./utils/connectDB";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

app.get("/", (req, res) => {
  res.send("The first of many steps.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
