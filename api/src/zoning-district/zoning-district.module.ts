import { Module } from '@nestjs/common';
import { ZoningDistrictController } from './zoning-district.controller';
import { ZoningDistrictService } from './zoning-district.service';

@Module({
  controllers: [ZoningDistrictController],
  providers: [ZoningDistrictService],
})
export class ZoningDistrictModule {}
