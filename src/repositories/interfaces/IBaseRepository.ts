import IBaseModel from "../../models/base/IBaseModel";

interface IBaseRepository<T extends IBaseModel> {
  createItem(data: T): T;
  getItem(id: string): T | undefined;
  getList(): Array<T>;
}

export default IBaseRepository;
export { IBaseRepository };
