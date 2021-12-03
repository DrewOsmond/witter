import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { User } from "../../types";
import bycrypt from "bcrypt";

const secret: string = String(process.env.JWT_SECRET);
const inProduction: boolean = process.env.NODE_ENV === "prudction";

export const signJWT = (req: Request, res: Response) => {
  const { user } = req.body;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    secret,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 7 * 52,
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: inProduction && "lax",
    secure: inProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
  });
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(200).json(null);
  }

  jwt.verify(token, secret, undefined, async (err, payload: any) => {
    if (err) {
      return res.status(403).json({
        error: "not authorized",
      });
    }

    const { email } = payload;

    let success = true;
    const user = await prisma.user
      .findUnique({ where: { email } })
      .catch((err) => {
        success = false;
        return err;
      });

    if (user && success) {
      user.password = "";
      req.body = { user };
      next();
      return;
    }
    res.status(404).json({ error: "account not found" });
    return;
  });
  return;
};

export const registerUser = async (req: Request, res: Response) => {
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
    res.json({ user });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "must include valid credentials" });
  }
  const credentials = username ? { username } : { email };
  const user: User | null = await prisma.user.findUnique({
    where: credentials,
  });

  if (user && bycrypt.compareSync(password, user.password)) {
    req.body = { user };
    signJWT(req, res);
    user.password = "";
    return res.json({ user });
  }
  return res
    .status(400)
    .json({ error: "username, email, or password are incorrect" });
};
