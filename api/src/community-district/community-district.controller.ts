import { Controller, Get, Param } from '@nestjs/common';
import { CommunityDistrictService } from './community-district.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  SelectCommunityDistrictFeatureDto,
  SelectCommunityDistrictFieldDto,
  SelectCommunityDistrictFieldType,
} from 'src/schema/community-district';

@Controller('community-district')
export class CommunityDistrictController {
  constructor(private readonly service: CommunityDistrictService) {}

  @Get('/')
  @ApiResponse({
    description: 'Retrieve non-spatial fields for all community districts',
    isArray: true,
    type: SelectCommunityDistrictFeatureDto,
  })
  async getAll(): Promise<Array<SelectCommunityDistrictFieldType>> {
    return this.service.getAll();
  }

  @Get('/:id')
  @ApiResponse({
    description: 'Retrieve non-spatial fields for all community districts',
    type: SelectCommunityDistrictFieldDto,
  })
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
