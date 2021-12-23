import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../controllers/auth";
import { createReply, likeReply, unlikeReply } from "../controllers/reply";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  asyncHandler(async (req, res) => {
    createReply(req, res);
  })
);

router.post(
  "/like",
  authenticateUser,
  asyncHandler(async (req, res) => {
    likeReply(req, res);
  })
);

router.delete(
  "/unlike",
  authenticateUser,
  asyncHandler(async (req, res) => {
    unlikeReply(req, res);
  })
);
export default router;
