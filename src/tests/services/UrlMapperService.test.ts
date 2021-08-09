import dummyDb from "../../dummyDb";
import { CustomError } from "../../errors";
import iocContainer from "../../ioc/inversify.config";
import { TYPES } from "../../ioc/types";
import { UrlMapperModel } from "../../models";
import { IUrlMapperService } from "../../services/interfaces";

describe("UrlMapperService", () => {
  afterEach(() => {
    dummyDb.length = 0;
  });

  test("getList", () => {
    const url = "www.google.com";
    const service = iocContainer.get<IUrlMapperService>(
      TYPES.IUrlMapperService
    );
    service.shorten(url);
    const items = service.getList();

    expect(Array.isArray(items)).toBe(true);
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveProperty("url", "https://www.google.com");
  });

  describe("shorten", () => {
    test("invalid url", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "blabla";
      try {
        service.shorten(url);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error).toHaveProperty("statusCode", 400);
      }
    });
    test("valid url without protocol", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "www.google.com";
      const item = service.shorten(url);
      expect(item).toBeInstanceOf(UrlMapperModel);
      expect(item).toHaveProperty("url", "https://www.google.com");
    });
    test("valid url", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "https://www.google.com";
      const item = service.shorten(url);
      expect(item).toBeInstanceOf(UrlMapperModel);
      expect(item).toHaveProperty("url", "https://www.google.com");
    });
    test("valid url without protocol and www.", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "google.com";
      const item = service.shorten(url);
      expect(item).toBeInstanceOf(UrlMapperModel);
      expect(item).toHaveProperty("url", "https://www.google.com");
    });
  });
  describe("getByShortUrl", () => {
    test("short url exists", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "www.google.com";
      const createdItem = service.shorten(url);
      const fetchedItem = service.getByShortUrl(createdItem.shortUrl);

      expect(createdItem).toEqual(fetchedItem);
    });
    test("short url doesn't exist", () => {
      const service = iocContainer.get<IUrlMapperService>(
        TYPES.IUrlMapperService
      );
      const url = "www.google.com";
      service.shorten(url);
      try {
        service.getByShortUrl("createdItem.shortUrl");
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error).toHaveProperty("statusCode", 404);
      }
    });
  });
});
