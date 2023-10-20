import { Controller, Get, Param, Query } from '@nestjs/common';
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
  async getAll(@Query() { code }: { code?: string }) {
    return this.service.getAllCommunityDistrict(code);
  }

  @Get('community-district/:id')
  @ApiTags('community district')
  @ApiResponse({
    description: 'Retrieve geojson for a specified community districts',
  })
  async getByIdGeoJSON(@Param('id') id: number) {
    return this.service.getByIdCommunityDistrict(id);
  }

  @Get('community-district/:id/tax-lot')
  @ApiTags('community district', 'tax lot')
  @ApiResponse({
    description:
      'Retrieve the tax lot geojson within a specified community district',
  })
  async getByCommunityDistrictIdTaxLot(@Param('id') id: number) {
    return this.service.getByCommunityDistrictIdTaxLot(id);
  }
}
