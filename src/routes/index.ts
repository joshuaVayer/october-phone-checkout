import express, { Router, Response } from "express";

import phoneNumber from "../controllers/phoneNumber";
import validateSearchParams from "../middlewares/validateSearchParams";

const router: Router = express.Router();

/**
 * @route   GET /
 * @desc    Documentation for the API.
 * @access  Public
*/
router.get("/", (_, res: Response) => {
  res.sendFile("home.html", { root: "./src/views" });
});

/**
 * @route   GET /phone-number
 * @desc    Search for companies phone numbers
 * @access  Public
 * @param   {string} registrationNumber - [Optional] The registration number of the company.
 * @param   {string} companyName - [Optional] The name of the company.
 * @param   {string} postalCode - [Optional] The postal code of the company.
 * @returns {object} - The response object.
 */
router.get("/phone-number", validateSearchParams, phoneNumber);

export default router;
