import { Controller, Get, Param } from '@nestjs/common';
import {
  CommunityDistrictFeature,
  CommunityDistrictService,
} from './community-district.service';
import { SelectCommunityDistrict } from 'src/schema/community-district';

@Controller('community-district')
export class CommunityDistrictController {
  constructor(private readonly service: CommunityDistrictService) {}

  @Get('/')
  async getAll(): Promise<Array<Partial<SelectCommunityDistrict>>> {
    return this.service.getAll();
  }

  @Get('/geojson')
  async getAllGeoJSON(): Promise<Array<CommunityDistrictFeature>> {
    return this.service.getAllGeoJSON();
  }

  @Get('/:id')
  async getById(
    @Param('id') id: number,
  ): Promise<Partial<SelectCommunityDistrict>> {
    return this.service.getById(id);
  }

  @Get('/:id/geojson')
  async getByIdGeoJSON(
    @Param('id') id: number,
  ): Promise<CommunityDistrictFeature> {
    return this.service.getByIdGeoJSON(id);
  }
}
