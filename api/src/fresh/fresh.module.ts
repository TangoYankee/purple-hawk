import { Module } from '@nestjs/common';
import { FreshController } from './fresh.controller';
import { FreshService } from './fresh.service';

@Module({
  controllers: [FreshController],
  providers: [FreshService],
})
export class FreshModule {}
