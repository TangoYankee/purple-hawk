import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommunityDistrictService } from './community-district.service';
import { GeoJSONQuery } from 'src/types';

@Controller('community-district')
export class CommunityDistrictController {
  constructor(private readonly service: CommunityDistrictService) {}

  @Get('/')
  async getAll(@Query() { geojson }: GeoJSONQuery) {
    return geojson === 'true'
      ? this.service.getAllGeoJSON()
      : this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Query() { geojson }: GeoJSONQuery) {
    return geojson === 'true'
      ? this.service.getByIdGeoJSON(id)
      : this.service.getById(id);
  }
}
