import * as mongoose from 'mongoose';
import { Provider } from '@nestjs/common';
export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const uri = process.env.MONGO_URI || '';
      return mongoose.connect(uri);
    },
  },
];
