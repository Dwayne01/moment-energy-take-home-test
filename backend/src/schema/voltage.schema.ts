import { Schema } from 'mongoose';

export const VoltageSchema = new Schema({
  voltage: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now, required: true },
});
