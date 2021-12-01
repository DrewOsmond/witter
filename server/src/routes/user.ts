import { Router } from "express";
import { prisma } from "../../index";
import asyncHandler from "express-async-handler";
import bycrypt from "bcrypt";
import { signJWT } from "../controllers/auth";
import { User } from "../../types";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const credentials = username ? { username } : { email };

    const user: User | null = await prisma.user.findUnique({
      where: credentials,
    });

    if (user) {
      if (bycrypt.compareSync(password, user.password)) {
        req.body = { user };
        signJWT(req, res);
        user.password = "";
        res.json(user);
      } else {
        res
          .status(400)
          .json({ error: "username, email, or password are incorrect" });
      }
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bycrypt.hash(password, 12);
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.toLowerCase().match(isEmail)) {
      res.status(400).json({ error: "please use a valid email" });
      return;
    }

    let succeeded = true;

    const user: User = await prisma.user
      .create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })
      .catch((err) => {
        succeeded = false;
        return err;
      });

    if (user && succeeded) {
      req.body = { user };
      signJWT(req, res);
      user.password = "";
      res.json(user);
    }
  })
);

export default router;
