import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  createWit,
  likeWit,
  unlikeWit,
  fetchRecentWits,
} from "../controllers/wits";
import { authenticateUser } from "../controllers/auth";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  asyncHandler(async (req, res) => {
    createWit(req, res);
  })
);

router.post(
  "/like",
  authenticateUser,
  asyncHandler(async (req, res) => {
    likeWit(req, res);
  })
);

router.delete(
  "/unlike",
  authenticateUser,
  asyncHandler(async (req, res) => {
    console.log("wuh?");
    unlikeWit(req, res);
  })
);

router.get(
  "/explore",
  asyncHandler(async (req, res) => {
    fetchRecentWits(req, res);
  })
);

export default router;
