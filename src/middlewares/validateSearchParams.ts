import { NextFunction, Response } from "express";
import { RequestWithQuery } from "../types/Interfaces";

import {
  isValidPostalCode,
  isValidRegistrationNumber
} from "../utils/searchParams";

/**
 *   Will handle the error and log it.
 * @param request - The request that was made.
 * @param response - The response that was sent.
 * @param next - The next function to call.
 */
const validateSearchParams = async (request: RequestWithQuery, response: Response, next: NextFunction) => {
  const { companyName, postalCode, registrationNumber } = request.query;

  if (!registrationNumber && !companyName) {
    return response.status(400).send({
      status: "error",
      message: "Missing registrationNumber or company"
    });
  }

  if (registrationNumber) {
    const isValid = await isValidRegistrationNumber(registrationNumber);
    if (!isValid) {
      return response.status(400).send({
        status: "error",
        message: "Invalid registration number"
      });
    }
    // If the registration number is valid, we can continue as we will not use other search params.
    return next();
  }

  if (companyName && companyName.length > 100) {
    return response.status(400).send({
      status: "error",
      message: "Company name is too long"
    });
  }

  if (postalCode && !isValidPostalCode(postalCode)) {
    return response.status(400).send({
      status: "error",
      message: "Invalid postal code"
    });
  }

  next();
};

export default validateSearchParams;
