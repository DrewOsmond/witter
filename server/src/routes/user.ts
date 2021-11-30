import { Router } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../index";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const credentials = username ? { username } : { email };

    const user = await prisma.user.findUnique({ where: credentials });
    if (user?.password === password) {
      res.json(user);
    } else {
      res
        .status(400)
        .json({ error: "username, email, or password are incorrect" });
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    console.log(newUser);
    res.json(newUser);
  })
);

export default router;
