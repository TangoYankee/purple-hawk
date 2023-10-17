import { Controller, Get, Param } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';

@Controller('neighborhood')
export class NeighborhoodController {
  constructor(private readonly service: NeighborhoodService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
