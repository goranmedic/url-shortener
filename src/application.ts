import express from "express";
import { routes } from "./routes/routes";

const application = async () => {
  const app = express();
  app.use(express.json());

  routes(app);

  return app;
};

export { application };
