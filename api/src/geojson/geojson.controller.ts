import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  SelectCommunityDistrictFeatureDto,
  SelectCommunityDistrictFeatureType,
} from 'src/schema/community-district';
import { GeoJSONService } from './geojson.service';

@Controller('geojson')
export class GeoJSONController {
  constructor(private readonly service: GeoJSONService) {}

  @Get('/community-district')
  @ApiResponse({
    description: 'Retrieve geojson for all community districts',
    isArray: true,
    type: SelectCommunityDistrictFeatureDto,
  })
  async getAll(): Promise<Array<SelectCommunityDistrictFeatureType>> {
    return this.service.getAll();
  }

  @Get('community-district/:id')
  @ApiResponse({
    description: 'Retrieve geojson for all community districts',
    type: SelectCommunityDistrictFeatureDto,
  })
  async getByIdGeoJSON(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
