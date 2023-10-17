import { Module } from '@nestjs/common';
import { BoroughController } from './borough.controller';
import { BoroughService } from './borough.service';

@Module({
  controllers: [BoroughController],
  providers: [BoroughService],
})
export class BoroughModule {}
