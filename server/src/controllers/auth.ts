import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

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

  jwt.verify(token, secret, undefined, async (err, payload) => {
    if (err) {
      return res.status(403).json({
        error: "not authorized",
      });
    }

    const { email } = payload;
  });
};
