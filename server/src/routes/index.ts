import express, { Router, Request, Response } from "express";
import path from "path";
import userRouter from "./user";
import witRouter from "./wits";
import replyRouter from "./reply";

const router = Router();

router.use("/session", userRouter);
router.use("/wit", witRouter);
router.use("/reply", replyRouter);

if (process.env.NODE_ENV === "production") {
  const sendStatic = (req: Request, res: Response) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());

    res.sendFile(
      path.resolve(__dirname, "../../../web", "build", "index.html")
    );
  };

  router.use(
    express.static(
      path.resolve(__dirname, "../../../web", "build", "index.html")
    )
  );

  router.get("/", sendStatic);
  router.get(/^(?!\/?api).*/, sendStatic);
}

export default router;
