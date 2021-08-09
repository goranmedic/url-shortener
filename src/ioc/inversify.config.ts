import { Container } from "inversify";
import "reflect-metadata";
import { UrlMapperRepository } from "../repositories";
import { IUrlMapperRepository } from "../repositories/interfaces";
import { UrlMapperService } from "../services";
import { IUrlMapperService } from "../services/interfaces";
import { TYPES } from "./types";

const iocContainer = new Container();

iocContainer
  .bind<IUrlMapperRepository>(TYPES.IUrlMapperRepository)
  .to(UrlMapperRepository);
iocContainer
  .bind<IUrlMapperService>(TYPES.IUrlMapperService)
  .to(UrlMapperService);

export default iocContainer;
export { iocContainer };
