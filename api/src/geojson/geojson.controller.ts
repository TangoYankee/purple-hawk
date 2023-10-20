import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeoJSONService } from './geojson.service';

@Controller('geojson')
@ApiTags('geojson')
export class GeoJSONController {
  constructor(private readonly service: GeoJSONService) {}

  @Get('/community-district')
  @ApiTags('community district')
  @ApiResponse({
    description: 'Retrieve geojson for all community districts',
    isArray: true,
  })
  async getAll() {
    return this.service.getAllCommunityDistrict();
  }

  @Get('community-district/:id')
  @ApiTags('community district')
  @ApiResponse({
    description: 'Retrieve geojson for a specified community districts',
  })
  async getByIdGeoJSON(@Param('id') id: number) {
    return this.service.getByIdCommunityDistrict(id);
  }
}
