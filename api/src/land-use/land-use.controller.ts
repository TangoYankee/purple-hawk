import { Controller, Get, Param } from '@nestjs/common';
import { LandUseService } from './land-use.service';

@Controller('land-use')
export class LandUseController {
  constructor(private readonly service: LandUseService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:code')
  async getByCode(@Param('code') code: string) {
    return this.service.getByCode(code);
  }
}
