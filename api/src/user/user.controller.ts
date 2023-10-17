import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { InsertUser } from 'src/schema/user';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post('/')
  async create(@Body() params: InsertUser) {
    return await this.service.create({
      name: params.name,
    });
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() params: { name: string }) {
    return await this.service.update(id, {
      name: params.name,
    });
  }
}
