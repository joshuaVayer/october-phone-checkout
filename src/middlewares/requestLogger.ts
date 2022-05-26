import "colors";
import { Request, Response, NextFunction } from "express";

import logger from "../utils/logger";
import dateUtils from "../utils/date";

// ---------------
// HELPER
// ---------------

/**
 * Will return the duration of the request in milliseconds.
 * @param {Array} start - The start time of the request.
 * @returns {number} The duration of the request in milliseconds.
 */
const getRequestDuration = (start: [number, number]): number => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

// ---------------
// MAIN
// ---------------

/**
 * Will log the request every time it is received.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { statusCode } = res;
  const { method, url } = req;
  const date: Date = new Date();

  const formattedDate: string = dateUtils.asReadableString(date);

  const durationInMilliseconds: number = getRequestDuration(process.hrtime());

  logger.basic(
    `[SERVER][${formattedDate}]`.blue,
    `${method}:${url}`,
    `${statusCode} ${durationInMilliseconds.toLocaleString() + "ms"}`.red
  );
  next();
};

export default requestLogger;
