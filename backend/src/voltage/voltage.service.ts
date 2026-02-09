import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Voltage } from './interface/voltage.interface';
import { VoltageDto } from './dto/voltage.dto';

@Injectable()
export class VoltageService {
  constructor(@Inject('VOLTAGE_MODEL') private voltageModel: Model<Voltage>) {}

  getVoltage() {
    return this.voltageModel.find().sort({ timestamp: 1 }).exec();
  }

  async findVoltageAfterTimeStamp(after: Date) {
    try {
      // Find voltage records with a timestamp greater than or equal to the specified date and sort them in ascending order by timestamp
      return this.voltageModel
        .find({ timestamp: { $gte: after } })
        .sort({ timestamp: 1 })
        .exec();
    } catch (error) {
      throw new Error(
        `Failed to retrieve voltage records: ${(error as Error).message}`,
      );
    }
  }

  async createVoltage(data: VoltageDto) {
    try {
      const created = new this.voltageModel(data);
      return created.save();
    } catch (error) {
      throw new Error(
        `Failed to create voltage record: ${(error as Error).message}`,
      );
    }
  }

  async createMultipleVoltage(data: VoltageDto[]) {
    try {
      // Insert multiple voltage data into the database in bulk
      return this.voltageModel.insertMany(data);
    } catch (error) {
      throw new Error(
        `Failed to create multiple voltage records: ${(error as Error).message}`,
      );
    }
  }
}
