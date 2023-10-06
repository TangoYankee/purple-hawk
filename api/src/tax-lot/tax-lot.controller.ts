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
import { TaxLotService } from './tax-lot.service';
import { Polygon } from '../../drizzle-pgis/types';

@Controller('tax-lot')
export class TaxLotController {
  constructor(private readonly service: TaxLotService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post('/')
  async create(
    @Body() params: { id: string; wgs84: Polygon },
  ): Promise<{ id: string }> {
    return await this.service.create(params);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() params: { wgs84: Polygon }) {
    return await this.service.update(id, params);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return null;
  }
}
