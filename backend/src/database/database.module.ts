import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
