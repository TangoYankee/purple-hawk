import { Controller, Get, Param } from '@nestjs/common';
import { FreshService } from './fresh.service';

@Controller('fresh')
export class FreshController {
  constructor(private readonly service: FreshService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
