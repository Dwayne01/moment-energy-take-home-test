import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { SearchVoltageDto } from './dto/search-voltage.dto';
import { VoltageDto } from './dto/voltage.dto';

@Controller('voltage')
export class VoltageController {
  constructor(private readonly voltageService: VoltageService) {}

  @Get()
  async getVoltage() {
    return await this.voltageService.getVoltage();
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchVoltage(@Query() dto: SearchVoltageDto) {
    const afterDate = new Date(dto.after);
    return await this.voltageService.findVoltageAfterTimeStamp(afterDate);
  }

  @Post()
  async createVoltage(@Body() body: VoltageDto) {
    return await this.voltageService.createVoltage(body);
  }

  @Post('batch')
  async createBatchVoltage(@Body() body: VoltageDto[]) {
    return await this.voltageService.createMultipleVoltage(body);
  }
}
