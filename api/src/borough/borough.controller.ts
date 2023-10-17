import { Controller, Get, Param } from '@nestjs/common';
import { BoroughService } from './borough.service';

@Controller('borough')
export class BoroughController {
  constructor(private readonly service: BoroughService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
