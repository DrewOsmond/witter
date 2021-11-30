import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();

import apiRouter from "./routes/index";

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

async function main() {
  // await prisma.user.create({
  //   data: {
  //     username: "test123",
  //     email: "test@prisma.io",
  //     password: "test1432",
  //   },
  // });

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers);
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
