import { Model, ModelObject } from "objection";
export declare class Sample extends Model {
    static tableName: string;
    id: string;
    value: string;
}
export type ISample = ModelObject<Sample>;
