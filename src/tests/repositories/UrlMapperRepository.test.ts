import dummyDb from "../../dummyDb";
import iocContainer from "../../ioc/inversify.config";
import { TYPES } from "../../ioc/types";
import { UrlMapperModel } from "../../models";
import { UrlMapperRepository } from "../../repositories";
import { IUrlMapperRepository } from "../../repositories/interfaces";

describe("UrlMapperRepository", () => {
  afterEach(() => {
    dummyDb.length = 0;
  });

  test("createItem", () => {
    const url = "www.google.com";
    const shortUrl = "dummy_shortUrl";
    const repository = iocContainer.get<IUrlMapperRepository>(
      TYPES.IUrlMapperRepository
    );
    const model = new UrlMapperModel(url, shortUrl);
    const createdItem = repository.createItem(model);

    expect(createdItem).toEqual(model);
  });

  test("getList", () => {
    const url = "www.google.com";
    const shortUrl = "dummy_shortUrl";
    const repository = iocContainer.get<IUrlMapperRepository>(
      TYPES.IUrlMapperRepository
    );
    const model = new UrlMapperModel(url, shortUrl);
    repository.createItem(model);
    const items = repository.getList();

    expect(Array.isArray(items)).toBe(true);
    expect(items).toContainEqual(model);
  });

  test("getItem", () => {
    const url = "www.google.com";
    const shortUrl = "dummy_shortUrl";
    const repository = iocContainer.get<IUrlMapperRepository>(
      TYPES.IUrlMapperRepository
    );
    const model = new UrlMapperModel(url, shortUrl);
    repository.createItem(model);
    const fetchedItem = repository.getItem(model.id);

    expect(fetchedItem).toEqual(model);
  });

  describe("getByShortUrl", () => {
    test("short url exists", () => {
      const url = "www.google.com";
      const shortUrl = "dummy_shortUrl";
      const repository = iocContainer.get<IUrlMapperRepository>(
        TYPES.IUrlMapperRepository
      );
      const model = new UrlMapperModel(url, shortUrl);
      repository.createItem(model);
      const fetchedItem = repository.getByShortUrl(model.shortUrl);

      expect(fetchedItem).toEqual(model);
    });
    test("short url doesn't exist", () => {
      const url = "www.google.com";
      const shortUrl = "dummy_shortUrl";
      const repository = iocContainer.get<IUrlMapperRepository>(
        TYPES.IUrlMapperRepository
      );
      const model = new UrlMapperModel(url, shortUrl);
      repository.createItem(model);
      const fetchedItem = repository.getByShortUrl("dummy_shortUrl111111111");

      expect(fetchedItem).toBe(undefined);
    });
  });
});
