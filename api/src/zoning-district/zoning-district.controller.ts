import { Controller, Get, Param } from '@nestjs/common';
import { ZoningDistrictService } from './zoning-district.service';

@Controller('zoning-district')
export class ZoningDistrictController {
  constructor(private readonly service: ZoningDistrictService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
