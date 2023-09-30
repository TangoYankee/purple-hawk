import { Controller, Get } from '@nestjs/common';
import { TaxLotService } from './tax-lot.service';

@Controller('tax-lot')
export class TaxLotController {
  constructor(private readonly service: TaxLotService) {}

  @Get('/')
  async getAll() {
    return this.service.getAll();
  }
}
