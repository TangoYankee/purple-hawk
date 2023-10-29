import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { building } from 'src/schema/building';

@Injectable()
export class BuildingService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // limit to 25 to prevent overwhelming network calls
  async getAll() {
    return await this.db
      .select({
        idNumber: building.idNumber,
        constructionYear: building.constructionYear,
        roofHeight: building.roofHeight,
        groundElevation: building.groundElevation,
        featCode: building.featCode,
      })
      .from(building)
      .limit(25);
  }

  async getByBin(bin: string) {
    const result = await this.db
      .select({
        idNumber: building.idNumber,
        constructionYear: building.constructionYear,
        roofHeight: building.roofHeight,
        groundElevation: building.groundElevation,
        featCode: building.featCode,
      })
      .from(building)
      .where(eq(building.idNumber, bin));
    return result[0];
  }
}
