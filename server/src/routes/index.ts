import { Router } from "express";
import userRouter from "./user";
import witRouter from "./wits";

const router = Router();

router.use("/session", userRouter);
router.use("/wit", witRouter);

export default router;
