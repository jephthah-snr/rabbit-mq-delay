import SampleRepository from "../repositories/sample.repositories";
export default class SampleService {
    sampleRepo: SampleRepository;
    execute(value: string): Promise<{
        status: boolean;
        message: string;
        data: {
            sample: import("../models/sample.model").Sample;
        };
    }>;
}
