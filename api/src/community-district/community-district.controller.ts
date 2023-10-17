import { Controller, Get, Param } from '@nestjs/common';
import { CommunityDistrictService } from './community-district.service';

@Controller('community-district')
export class CommunityDistrictController {
  constructor(private readonly service: CommunityDistrictService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
