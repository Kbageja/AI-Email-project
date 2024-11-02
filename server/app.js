import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
