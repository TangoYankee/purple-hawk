import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './config';
import { GlobalModule } from './global/global.module';
import { ProjectModule } from './project/project.module';
import { TaxLotModule } from './tax-lot/tax-lot.module';
import { BoroughModule } from './borough/borough.module';
import { CommunityDistrictModule } from './community-district/community-district.module';
import { FreshModule } from './fresh/fresh.module';
import { LandUseModule } from './land-use/land-use.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DbConfig],
    }),
    GlobalModule,
    BoroughModule,
    CommunityDistrictModule,
    FreshModule,
    LandUseModule,
    ProjectModule,
    TaxLotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
