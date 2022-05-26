// EXTERNAL DEPENDENCIES
import dotenv from "dotenv";
import express, { Application } from "express";

// MODULES
import Router from "./routes";
import config from "./config";
import logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";

// ENV VARIABLES
dotenv.config();
const { PORT } = config;

// APP INITIALIZATION
const app: Application = express();

// LOGGER
app.use(requestLogger);

// REGISTER ROUTES
app.use(Router);

// ERROR HANDLER
app.use(errorHandler);

// RUN RUN RUN 🚀
app.listen(PORT, () => {
  logger.info(config.texts.serverStarted(PORT));
});
