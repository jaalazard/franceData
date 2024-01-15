import express, { Router, Request, Response } from "express";
import { getDepartmentsByRegion } from "../services/region-service";

const regionRouter: Router = express.Router();

regionRouter.get("/:regionId", async (req: Request, res: Response) => {
  try {
    await getDepartmentsByRegion(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default regionRouter;
