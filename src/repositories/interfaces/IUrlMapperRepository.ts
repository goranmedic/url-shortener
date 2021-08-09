import { UrlMapperModel } from "../../models";
import UrlMapper from "../../models/UrlMapperModel";
import IBaseRepository from "./IBaseRepository";

interface IUrlMapperRepository extends IBaseRepository<UrlMapperModel> {
  getByShortUrl(shortUrl: string): UrlMapper | undefined;
}

export default IUrlMapperRepository;
export { IUrlMapperRepository };
