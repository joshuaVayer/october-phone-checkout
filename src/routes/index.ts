import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/search", (req: Request, res: Response) => {
  res.send("search");
});

router.get("/error", (req: Request, res: Response) => {
  throw new Error("Error page");
});

export default router;
