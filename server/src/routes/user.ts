import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser, registerUser, loginUser } from "../controllers/auth";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    loginUser(req, res);
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    registerUser(req, res);
  })
);

router.post(
  "/restore",
  authenticateUser,
  asyncHandler((req, res) => {
    const { user } = req.body.user;
    if (!user) return;
    res.json(user);
  })
);

router.delete("/logout", (_req, res) => {
  res.clearCookie("token").sendStatus(200);
});

export default router;
