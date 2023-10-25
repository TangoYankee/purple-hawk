import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { InsertProject } from 'src/schema/project';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async geyById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get(':id/site-description')
  async getByIdSiteDescription(
    @Param('id') id: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByIdDescription({
      projectId: id,
      studyExtent: 'site',
      bufferFt,
    });
  }

  @Get(':id/area-description')
  async getByIdAreaDescription(
    @Param('id') id: string,
    @Query() query: { bufferFt?: string },
  ) {
    const { bufferFt: bufferRaw } = query;
    const bufferFt = isNaN(parseInt(bufferRaw)) ? null : parseInt(bufferRaw);

    return this.service.getByIdDescription({
      projectId: id,
      studyExtent: 'area',
      bufferFt,
    });
  }

  @Post('/')
  async create(@Body() params: InsertProject) {
    return await this.service.create({
      userId: params.userId,
      name: params.name,
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    {
      name,
      userId,
      siteBbls,
      areaBbls,
    }: {
      name?: string;
      userId?: string;
      siteBbls?: Array<string>;
      areaBbls?: Array<string>;
    },
  ) {
    return await this.service.update({
      projectId: id,
      projectName: name,
      userId,
      siteBbls,
      areaBbls,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return null;
  }
}
