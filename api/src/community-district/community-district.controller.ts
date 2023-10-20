import { Controller, Get, Param } from '@nestjs/common';
import { CommunityDistrictService } from './community-district.service';
import { CommunityDistrictTraits } from 'src/schema/community-district';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('community-district')
@ApiTags('community district')
export class CommunityDistrictController {
  constructor(private readonly service: CommunityDistrictService) {}

  @Get('/')
  @ApiResponse({
    description: 'Retrieve properties for all community districts',
    isArray: true,
  })
  async getAll(): Promise<Array<CommunityDistrictTraits>> {
    return this.service.getAll();
  }

  @Get('/:id')
  @ApiResponse({
    description: 'Retrieve properties for a specified community district',
  })
  async getById(@Param('id') id: number): Promise<CommunityDistrictTraits> {
    return this.service.getById(id);
  }
}
