import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectTaxLot, taxLot } from 'src/schema/tax-lot';

@Injectable()
export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // Limit results to 2 to avoid crashing application
  async getAll(): Promise<Array<SelectTaxLot>> {
    const result = await this.db.select().from(taxLot).limit(2);
    return result;
  }

  async getById(bbl: string): Promise<SelectTaxLot> {
    const result = await this.db
      .select()
      .from(taxLot)
      .where(eq(taxLot.bbl, bbl));
    return result[0];
  }
}
