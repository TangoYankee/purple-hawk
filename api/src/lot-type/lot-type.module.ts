import { Module } from '@nestjs/common';
import { LotTypeController } from './lot-type.controller';
import { LotTypeService } from './lot-type.service';

@Module({
  controllers: [LotTypeController],
  providers: [LotTypeService],
})
export class LotTypeModule {}
