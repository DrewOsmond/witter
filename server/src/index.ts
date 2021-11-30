import express from "express";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4001;

const prisma = new PrismaClient();

const app = express();

async function main() {
  await prisma.user.create({
    data: {
      username: "test123",
      email: "test@prisma.io",
      password: "test1432",
    },
  });

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
