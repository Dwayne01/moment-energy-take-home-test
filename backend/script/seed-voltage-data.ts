import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { VoltageGeneratorService } from 'src/voltage/voltage.generator.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const generator = app.get(VoltageGeneratorService);
    await generator.handleGenerateVoltageData();
  } finally {
    await app.close();
  }
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
