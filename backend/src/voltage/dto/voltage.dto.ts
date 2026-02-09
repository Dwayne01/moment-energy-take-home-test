import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class VoltageDto {
  @IsNotEmpty({ message: 'voltage is required' })
  voltage: number;

  @IsNotEmpty({ message: 'timestamp is required' })
  @IsISO8601({}, { message: 'timestamp must be a valid ISO8601 date' })
  timestamp: Date;
}
