import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeoJSONService } from './geojson.service';

@Controller('geojson')
@ApiTags('geojson')
export class GeoJSONController {
  constructor(private readonly service: GeoJSONService) {}

  @Get('community-district')
  @ApiTags('community district')
  @ApiResponse({
    description: 'Retrieve geojson for all community districts',
    isArray: true,
  })
  async getAllCommunityDistrict() {
    return this.service.getAllCommunityDistrict();
  }

  @Get('community-district/:id')
  @ApiTags('community district')
  @ApiResponse({
    description: 'Retrieve geojson for a specified community districts',
  })
  async getByIdCommunityDistrict(@Param('id') id: number) {
    return this.service.getByIdCommunityDistrict(id);
  }

  @Get('project-site/:projectId')
  async getByProjectIdSite(
    @Param('projectId') projectId: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByProjectIdExtent({
      projectId,
      studyExtent: 'site',
      bufferFt,
    });
  }

  @Get('project-site/:projectId/community-district')
  async getByProjectIdSiteCommunityDistrict(
    @Param('projectId') projectId: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByProjectIdCommunityDistrict({
      projectId,
      studyExtent: 'site',
      bufferFt,
    });
  }

  @Get('project-area/:projectId')
  async getByProjectIdArea(
    @Param('projectId') projectId: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByProjectIdExtent({
      projectId,
      studyExtent: 'area',
      bufferFt,
    });
  }

  @Get('project-area/:projectId/community-district')
  async getByProjectIdAreaCommunityDistrict(
    @Param('projectId') projectId: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByProjectIdCommunityDistrict({
      projectId,
      studyExtent: 'area',
      bufferFt,
    });
  }

  @Get('facility')
  async getAllFacility() {
    return this.service.getAllFacility();
  }

  @Get('facility/:facilityId')
  async getByIdFacility(
    @Param('facilityId') facilityId: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);
    return this.service.getByIdFacility(facilityId, bufferFt);
  }
}
