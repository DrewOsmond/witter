import { Router } from "express";
import userRouter from "./user";
import witRouter from "./wits";
import replyRouter from "./reply";

const router = Router();

router.use("/session", userRouter);
router.use("/wit", witRouter);
router.use("/reply", replyRouter);

export default router;
