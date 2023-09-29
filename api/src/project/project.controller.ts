import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { InsertProject } from 'src/schema/project';

@Controller('project')
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

  @Post('/')
  async create(@Body() params: InsertProject) {
    return await this.service.create({
      name: params.name,
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() params: Partial<InsertProject>,
  ) {
    return await this.service.update(id, {
      name: params.name,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return null;
  }
}
