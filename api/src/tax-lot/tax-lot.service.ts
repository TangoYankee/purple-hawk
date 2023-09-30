import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { Point } from 'src/drizzle-pg-geotype';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectTaxLot, taxLot } from 'src/schema/tax-lot';

@Injectable()
export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectTaxLot>> {
    const result = await this.db
      .select({
        id: taxLot.id,
        geom: sql<string>`ST_AsGeoJSON(${taxLot.geom})`,
      })
      .from(taxLot);
    return result.map(({ id, geom }) => ({
      id,
      geom: JSON.parse(geom) as Point,
    }));
  }
}
