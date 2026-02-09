import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class SearchVoltageDto {
  @IsNotEmpty({ message: 'start date is required' })
  @IsISO8601({}, { message: 'start must be a valid ISO8601 date' })
  after: string;
}
