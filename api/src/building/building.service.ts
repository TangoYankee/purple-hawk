import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectBuilding, building } from 'src/schema/building/building';

@Injectable()
export class BuildingService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // limit to 25 to prevent overwhelming network calls
  async getAll(): Promise<Array<SelectBuilding>> {
    return await this.db.select().from(building).limit(25);
  }

  async getByBin(bin: string): Promise<SelectBuilding> {
    const result = await this.db
      .select()
      .from(building)
      .where(eq(building.idNumber, bin));
    return result[0];
  }
}
