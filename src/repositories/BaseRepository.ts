import { injectable } from "inversify";
import dummyDb from "../dummyDb";
import { BaseModel } from "../models";
import { IBaseRepository } from "./interfaces";

@injectable()
abstract class BaseRepository<T extends BaseModel>
  implements IBaseRepository<T>
{
  protected dummyDatabase: Array<T>;

  constructor() {
    this.dummyDatabase = dummyDb as Array<T>;
  }

  public getItem(id: string): T | undefined {
    return this.dummyDatabase.find((dbItem: T) => dbItem.id === id);
  }

  public createItem(data: T): T {
    this.dummyDatabase.push(data);

    return this.getItem(data.id)!;
  }

  public getList(): Array<T> {
    return this.dummyDatabase;
  }
}

export default BaseRepository;
export { BaseRepository };
