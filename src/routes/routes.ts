import { Express, NextFunction, Request, Response } from "express";

export const routes = (app: Express) => {
  app.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      return response.json("GET OK");
    }
  );

  app.get(
    "/:short_url",
    async (request: Request, response: Response, next: NextFunction) => {
      return response.json("GET BY URL OK");
    }
  );

  app.post(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      return response.json("POST OK");
    }
  );
};
