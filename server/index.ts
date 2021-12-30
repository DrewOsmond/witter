import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import apiRouter from "./src/routes/index";

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", apiRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}/`)
);
