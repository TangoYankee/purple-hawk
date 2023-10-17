import { Controller, Get, Param } from '@nestjs/common';
import { LotTypeService } from './lot-type.service';

@Controller('lot-type')
export class LotTypeController {
  constructor(private readonly service: LotTypeService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:code')
  async getByCode(@Param('code') code: string) {
    return this.service.getByCode(code);
  }
}
