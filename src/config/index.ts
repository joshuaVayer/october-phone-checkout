interface Config {
  PORT: number;
  texts: {
    serverStarted: string;
  };
  NOT_FOUND: {
    status: string;
    message: string;
  };
};

const PORT: number = Number(process.env.PORT) || 8080;

const config: Config = {
  PORT,
  texts: {
    serverStarted: `Server is running at http://localhost:${PORT} 🚀`
  },
  NOT_FOUND: {
    status: "not_found",
    message: `Check http://localhost:${PORT}/ for existing routes.`
  }
};

export default config;
