import { Request, Response } from "express";
import logger from "../utils/logger";

/**
 *   Will handle the error and log it.
 * @param error  - The error that was thrown.
 * @param request - The request that was made.
 * @param response - The response that was sent.
 */
const errorHandler = (error: Error, request: Request, response: Response) => {
  logger.error(error.message);

  response.status(500).send({
    status: "error",
    message: error.message,
    request: {
      method: request.method,
      url: request.url
    }
  });
};

export default errorHandler;
