import { NextFunction, Response } from "express";
import { SearchRequest } from "../types/Interfaces";

import { isValidRegistrationNumber } from "../utils/searchParams";

/**
 *   Will handle the error and log it.
 * @param request - The request that was made.
 * @param response - The response that was sent.
 * @param next - The next function to call.
 */
const validateSearchParams = async (request: SearchRequest, response: Response, next: NextFunction) => {
  const { registrationNumber, company } = request.query;
  if (!registrationNumber && !company) {
    return response.status(400).send({
      status: "error",
      message: "Missing registrationNumber or company"
    });
  }

  const isValid = await isValidRegistrationNumber(registrationNumber);
  console.log(isValid);

  if (!isValid) {
    return response.status(400).send({
      status: "error",
      message: "Invalid registration number"
    });
  }

  next();
};

export default validateSearchParams;
