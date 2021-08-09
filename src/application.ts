import express from "express";
import { errorHandler } from "./errors";
import { routes } from "./routes/routes";

const application = async () => {
  const app = express();
  app.use(express.json());

  routes(app);
  app.use(errorHandler);

  return app;
};

export { application };
