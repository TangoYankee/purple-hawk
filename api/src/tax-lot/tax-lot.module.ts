import { Module } from '@nestjs/common';
import { TaxLotController } from './tax-lot.controller';
import { TaxLotService } from './tax-lot.service';

@Module({
  controllers: [TaxLotController],
  providers: [TaxLotService],
})
export class TaxLotModule {}
