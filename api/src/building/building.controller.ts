import { Controller, Get, Param } from '@nestjs/common';
import { BuildingService } from './building.service';

@Controller('building')
export class BuildingController {
  constructor(private readonly service: BuildingService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:bin')
  async getByBin(@Param('bin') bin: string) {
    return this.service.getByBin(bin);
  }
}
