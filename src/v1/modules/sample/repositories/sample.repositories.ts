import { Transaction } from "objection";
import { ISample, Sample } from "../models/sample.model";

class SampleRepository {
    async create(data: Partial<ISample>, transaction?: Transaction) {
        return await Sample.query(transaction).insert(data).returning("*");   
    }

    async findById(id: string) {
        return await Sample.query().findById(id);
    }
}

export default SampleRepository;