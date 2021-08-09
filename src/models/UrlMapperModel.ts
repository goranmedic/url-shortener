import BaseModel from "./base/BaseModel";

class UrlMapperModel extends BaseModel {
  public url: string;
  public shortUrl: string;

  constructor(url: string, shortUrl: string) {
    super();
    this.url = url;
    this.shortUrl = shortUrl;
  }
}

export default UrlMapperModel;
export { UrlMapperModel };
