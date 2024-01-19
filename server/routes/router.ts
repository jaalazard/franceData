import express, { Router, Response } from "express";
import authRouter from "./authRouter";
import regionRouter from "./regionRouter";

const router: Router = express.Router();

router.get("/", (res: Response) => {
  res.send("Hello world!");
});

router.use("/auth", authRouter);
router.use("/region", regionRouter);
export default router;
