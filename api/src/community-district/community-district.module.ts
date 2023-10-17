import { Module } from '@nestjs/common';
import { CommunityDistrictController } from './community-district.controller';
import { CommunityDistrictService } from './community-district.service';

@Module({
  controllers: [CommunityDistrictController],
  providers: [CommunityDistrictService],
})
export class CommunityDistrictModule {}
