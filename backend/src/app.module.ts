import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoltageModule } from './voltage/voltage.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VoltageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
