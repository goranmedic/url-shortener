import { Express, NextFunction, Request, Response } from "express";
import iocContainer from "../ioc/inversify.config";
import { TYPES } from "../ioc/types";
import { IUrlMapperService } from "../services/interfaces";

export const routes = (app: Express) => {
  app.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const service = iocContainer.get<IUrlMapperService>(
          TYPES.IUrlMapperService
        );
        const items = service.getList();

        return response.json(items);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/:short_url",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const service = iocContainer.get<IUrlMapperService>(
          TYPES.IUrlMapperService
        );
        const item = service.getByShortUrl(request.params.short_url);

        return response.redirect(item.url);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const service = iocContainer.get<IUrlMapperService>(
          TYPES.IUrlMapperService
        );
        const item = service.shorten(request.body.url);

        response.json({ url: item.url, short_url: item.shortUrl });
      } catch (error) {
        next(error);
      }
    }
  );
};
