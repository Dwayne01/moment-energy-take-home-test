import { Connection } from 'mongoose';
import { VoltageSchema } from 'src/schema/voltage.schema';

export const voltageProviders = [
  {
    provide: 'VOLTAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Voltage', VoltageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
