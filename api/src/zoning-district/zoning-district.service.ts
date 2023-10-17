import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import {
  SelectZoningDistrict,
  zoningDistrict,
} from 'src/schema/zoning-district';

@Injectable()
export class ZoningDistrictService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // limit to 25 to prevent overwhelming network calls
  async getAll(): Promise<Array<SelectZoningDistrict>> {
    return await this.db.select().from(zoningDistrict).limit(25);
  }

  async getById(id: string): Promise<SelectZoningDistrict> {
    const result = await this.db
      .select()
      .from(zoningDistrict)
      .where(eq(zoningDistrict.id, id));
    return result[0];
  }
}
