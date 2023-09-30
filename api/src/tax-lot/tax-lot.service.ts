import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { Point } from 'src/drizzle-pg-geotype';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectTaxLot, InsertTaxLot, taxLot } from 'src/schema/tax-lot';

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

  async create(row: InsertTaxLot): Promise<{ id: string }> {
    const encodingQuery = await this.db.execute(
      sql<string>`select ST_GeomFromGeoJSON(${row.geom}) as enconded_geom`,
    );
    const encodedGeom = encodingQuery.rows[0].enconded_geom;
    const result = await this.db
      .insert(taxLot)
      .values({
        id: row.id,
        geom: encodedGeom as unknown as Point,
      })
      .returning({ id: taxLot.id });
    return result[0];
  }
}
