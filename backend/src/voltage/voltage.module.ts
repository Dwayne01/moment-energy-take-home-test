import { Module } from '@nestjs/common';
import { VoltageController } from './voltage.controller';
import { VoltageService } from './voltage.service';
import { VoltageGeneratorService } from './voltage.generator.service';
import { voltageProviders } from './voltage.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VoltageController],
  providers: [VoltageService, VoltageGeneratorService, ...voltageProviders],
  exports: [VoltageService, VoltageGeneratorService],
})
export class VoltageModule {}
