import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TaxLotService } from './tax-lot.service';

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
}
