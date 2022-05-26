// EXTERNAL DEPENDENCIES
import dotenv from "dotenv";
import express, { Application, Response } from "express";

// MODULES
import routes from "./routes";
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
app.use(routes);
app.use((_, res: Response) => {
  res.status(404).send(config.NOT_FOUND);
});

// ERROR HANDLER
app.use(errorHandler);

// RUN RUN RUN 🚀
app.listen(PORT, () => {
  logger.info(config.texts.serverStarted);
});
