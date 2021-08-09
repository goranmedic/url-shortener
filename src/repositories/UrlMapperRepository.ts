import { injectable } from "inversify";
import { UrlMapperModel } from "../models";
import BaseRepository from "./BaseRepository";
import { IUrlMapperRepository } from "./interfaces";

@injectable()
class UrlMapperRepository
  extends BaseRepository<UrlMapperModel>
  implements IUrlMapperRepository
{
  constructor() {
    super();
  }

  public getByShortUrl(shortUrl: string): UrlMapperModel | undefined {
    return this.dummyDatabase.find(
      (dbItem: UrlMapperModel) => dbItem.shortUrl === shortUrl
    );
  }
}

export default UrlMapperRepository;
export { UrlMapperRepository };
