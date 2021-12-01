import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();

import apiRouter from "./src/routes/index";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}/`)
);
