import { UrlMapperModel } from "../../models";

interface IUrlMapperService {
  getList(): Array<UrlMapperModel>;

  getByShortUrl(shortUrl: string): UrlMapperModel;

  shorten(url: string): UrlMapperModel;
}

export default IUrlMapperService;
export { IUrlMapperService };
