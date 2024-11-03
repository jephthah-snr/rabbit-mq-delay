import { Model, ModelObject } from "objection";

export class Sample extends Model {
  static tableName = "payment_reference_information";

  id!: string;

  value: string;
}

export type ISample = ModelObject<Sample>;
