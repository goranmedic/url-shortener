require("dotenv").config();
import { nanoid } from "nanoid";
import { UrlMapperModel } from "../models";
import validator from "validator";
import { InvalidUrlError, NotFoundError } from "../errors";
import { inject, injectable } from "inversify";
import { IUrlMapperService } from "./interfaces";
import { IUrlMapperRepository } from "../repositories/interfaces";
import { TYPES } from "../ioc/types";

@injectable()
class UrlMapperService implements IUrlMapperService {
  private urlMapperRepository: IUrlMapperRepository;
  constructor(
    @inject(TYPES.IUrlMapperRepository)
    urlMapperRepository: IUrlMapperRepository
  ) {
    this.urlMapperRepository = urlMapperRepository;
  }

  public getList(): Array<UrlMapperModel> {
    return this.urlMapperRepository.getList();
  }

  public getByShortUrl(shortUrl: string): UrlMapperModel {
    const item = this.urlMapperRepository.getByShortUrl(shortUrl);
    if (!item) {
      throw new NotFoundError(shortUrl);
    }
    return item;
  }

  public shorten(url: string): UrlMapperModel {
    if (!this.isValidUrl(url)) {
      throw new InvalidUrlError(url);
    }

    let shortUrl = this.createShortUrl();

    return this.urlMapperRepository.createItem(
      new UrlMapperModel(this.modifyUrlIfNeeded(url), shortUrl)
    );
  }

  private createShortUrl(): string {
    return nanoid();
  }

  private isValidUrl(url: string): boolean {
    return validator.isURL(url);
  }

  private modifyUrlIfNeeded(url: string): string {
    const isMissingHost = !validator.isURL(url, {
      require_protocol: true,
    });
    if (isMissingHost) {
      const isMissingWWW = !url.startsWith("www.");
      if (isMissingWWW) {
        return `https://www.${url}`;
      } else {
        return `https://${url}`;
      }
    }
    return url;
  }
}

export default UrlMapperService;
export { UrlMapperService };
