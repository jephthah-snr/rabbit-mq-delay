import { container, injectable } from "tsyringe";
import SampleRepository from "../repositories/sample.repositories";

@injectable()
export default class SampleService {
  public sampleRepo = container.resolve(SampleRepository);

  public async execute(value: string) {
    
    const sample = await this.sampleRepo.create({ value });

    return {
      status: true,
      message: "Sample service executed",
      data: {
        sample,
      },
    };
  }
}
