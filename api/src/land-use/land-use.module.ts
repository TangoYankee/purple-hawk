import { Module } from '@nestjs/common';
import { LandUseController } from './land-use.controller';
import { LandUseService } from './land-use.service';

@Module({
  controllers: [LandUseController],
  providers: [LandUseService],
})
export class LandUseModule {}
