import express, { Router, Request, Response } from "express";
import { getRegions, getRegionById ,getDepartmentsByRegion } from "../services/region-service";

const regionRouter: Router = express.Router();

regionRouter.get("/", async (req: Request, res: Response) => {
  try {
    await getRegions(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

regionRouter.get("/:regionId", async (req: Request, res: Response) => {
  try {
    await getRegionById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

regionRouter.get("/:regionId/departements", async (req: Request, res: Response) => {
  try {
    await getDepartmentsByRegion(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default regionRouter;
