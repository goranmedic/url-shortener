import { nanoid } from "nanoid";
import IBaseModel from "./IBaseModel";

abstract class BaseModel implements IBaseModel {
  public id: string;

  constructor() {
    this.id = nanoid();
  }
}

export default BaseModel;
export { BaseModel };
