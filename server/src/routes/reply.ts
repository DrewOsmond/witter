import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../controllers/auth";
import { createReply } from "../controllers/reply";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  asyncHandler(async (req, res) => {
    createReply(req, res);
  })
);

export default router;
