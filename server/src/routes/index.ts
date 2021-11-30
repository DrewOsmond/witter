import { Router } from "express";
import userRouter from "./user";

const router = Router();

router.use("/session", userRouter);

export default router;
