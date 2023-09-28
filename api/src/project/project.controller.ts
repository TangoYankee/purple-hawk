import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { InsertProject } from 'src/schema/project';

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Get('/')
  async getAll() {
    return this.service.list();
  }

  @Get('/:id')
  async geyById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post('/')
  async create(@Body() params: InsertProject) {
    const result = await this.service.create({
      name: params.name,
    });

    return result;
  }
}
