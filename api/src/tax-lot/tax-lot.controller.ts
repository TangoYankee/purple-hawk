import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaxLotService } from './tax-lot.service';
import { InsertTaxLot } from 'src/schema/tax-lot';

@Controller('tax-lot')
export class TaxLotController {
  constructor(private readonly service: TaxLotService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }

  @Post('/')
  async create(@Body() params: InsertTaxLot) {
    return await this.service.create(params);
  }
}
