import { Knex as IKnex } from "knex/types";
export default function init(): IKnex<any, any[]>;
export declare function getDB(): IKnex<any, any[]>;
