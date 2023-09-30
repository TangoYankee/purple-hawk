import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { Polygon } from 'src/drizzle-pgis/types';
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
      geom: JSON.parse(geom) as Polygon,
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
        geom: encodedGeom as unknown as Polygon,
      })
      .returning({ id: taxLot.id });
    return result[0];
  }
}
