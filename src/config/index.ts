interface Config {
  PORT: number;
  texts: {
    serverStarted: (port: number) => string;
  };
};

const config: Config = {
  PORT: Number(process.env.PORT) || 8080,
  texts: {
    serverStarted: (port: number) => `Server is running at http://localhost:${port} 🚀`
  }
};

export default config;
