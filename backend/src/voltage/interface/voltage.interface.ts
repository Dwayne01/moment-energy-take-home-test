import { Document } from 'mongoose';

export interface Voltage extends Document {
  readonly voltage: number;
  readonly timestamp: Date;
}
