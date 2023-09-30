import { Inject } from '@nestjs/common';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectTaxLot, taxLot } from 'src/schema/tax-lot';

export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectTaxLot>> {
    return this.db.select().from(taxLot);
  }
}
