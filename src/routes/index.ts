import express, { Router, Request, Response } from "express";

import searchPhoneNumbers from "../controllers/searchPhoneNumbers";
import validateSearchParams from "../middlewares/validateSearchParams";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/phone-number", validateSearchParams, searchPhoneNumbers);

export default router;
