import { Request, Response } from "express";

const searchController = (req: Request, res: Response) => {
  res.send("Search");
};

export default searchController;
