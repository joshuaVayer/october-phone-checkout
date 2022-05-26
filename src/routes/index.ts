import express, { Router, Request, Response } from "express";
import searchController from "../controllers/search";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/search", searchController);

router.get("/error", (req: Request, res: Response) => {
  throw new Error("Error page");
});

export default router;
