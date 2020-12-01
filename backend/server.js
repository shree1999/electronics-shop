import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

import { connectDatabase } from "./config/db.js";

dotenv.config();
await connectDatabase(mongoose); // database connection

const app = express();
const PORT = process.env.PORT || 8000;

// required middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(logger("dev"));

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
