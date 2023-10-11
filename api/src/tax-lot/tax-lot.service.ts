import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { taxLot } from 'src/schema/tax-lot';

@Injectable()
export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // Limit results to 25 to avoid crashing application
  async getAll(): Promise<Array<{ id: string; bbl: string }>> {
    const result = await this.db
      .select({
        id: taxLot.id,
        bbl: taxLot.bbl,
      })
      .from(taxLot)
      .limit(25);
    return result;
  }

  async getById(id: string): Promise<{ id: string }> {
    const result = await this.db
      .select({
        id: taxLot.id,
        bbl: taxLot.bbl,
      })
      .from(taxLot)
      .where(eq(taxLot.id, id));
    return result[0];
  }
}
