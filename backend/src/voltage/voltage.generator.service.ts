import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Voltage } from './interface/voltage.interface';

@Injectable()
export class VoltageGeneratorService {
  private readonly logger = new Logger(VoltageGeneratorService.name);

  constructor(@Inject('VOLTAGE_MODEL') private voltageModel: Model<Voltage>) {}

  generateVoltageData() {
    // We want to generate voltage data every 10 seconds for a 24 hour period
    const INTERVAL_IN_SECONDS = 10;
    const TOTAL_SECONDS_IN_A_DAY = 24 * 60 * 60;

    // gives the total number of data need to be generated for a 24 hour period at 10 second intervals
    const TOTAL_VOLTAGE_INPUT = TOTAL_SECONDS_IN_A_DAY / INTERVAL_IN_SECONDS;

    // it goes up and down between 0V and 5V in 0.01V per steps
    const STEP = 0.01;
    const MAX_VOLTAGE = 5.0;
    const MIN_VOLTAGE = 0.0;

    // Start at 0V and generate data points
    let voltage = MIN_VOLTAGE;

    // 1 = increasing, -1 = decreasing
    let direction = 1;

    const now = Date.now();
    // Start so the final sample is approximately "now" — cover the last 24 hours
    const startTime =
      now - (TOTAL_VOLTAGE_INPUT - 1) * INTERVAL_IN_SECONDS * 1000;
    const data: Voltage[] = [];

    // iterate through the total number of voltage inputs we need to generate
    for (let i = 0; i < TOTAL_VOLTAGE_INPUT; i++) {
      // Add a new voltage record with the current timestamp and voltage value
      data.push({
        timestamp: new Date(startTime + i * INTERVAL_IN_SECONDS * 1000),
        voltage: Number(voltage.toFixed(2)),
      } as Voltage);

      // incease or decrease voltage based on the current direction
      voltage += STEP * direction;

      // Reverse direction if we hit the max or min voltage to either 0V or 5V
      if (voltage >= MAX_VOLTAGE) {
        voltage = MAX_VOLTAGE;
        direction = -1;
      } else if (voltage <= MIN_VOLTAGE) {
        voltage = MIN_VOLTAGE;
        direction = 1;
      }
    }

    // return the generated voltage data
    return data;
  }

  async handleGenerateVoltageData() {
    try {
      // Generate voltage data
      const data = this.generateVoltageData();
      // Insert generated data into the database in bulk
      await this.voltageModel.insertMany(data);
      this.logger.log(`Generated and inserted ${data.length} voltage records.`);
    } catch (error) {
      this.logger.error(
        `Failed to generate voltage data: ${(error as Error).message}`,
      );
    }
  }
}
