import { Transaction } from "objection";
import { ISample, Sample } from "../models/sample.model";
declare class SampleRepository {
    create(data: Partial<ISample>, transaction?: Transaction): Promise<Sample>;
    findById(id: string): Promise<Sample | undefined>;
}
export default SampleRepository;
