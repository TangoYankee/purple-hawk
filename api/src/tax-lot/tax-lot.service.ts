import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
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

  async getById(id: string): Promise<SelectTaxLot> {
    const result = await this.db
      .select({
        id: taxLot.id,
        geom: sql<string>`ST_AsGeoJSON(${taxLot.geom})`,
      })
      .from(taxLot)
      .where(eq(taxLot.id, id));
    return result.map(({ id, geom }) => ({
      id,
      geom: JSON.parse(geom) as Polygon,
    }))[0];
  }

  async create(row: InsertTaxLot): Promise<{ id: string }> {
    const encodingQuery = await this.db.execute(
      sql<string>`select ST_GeomFromGeoJSON(${row.geom}) as encoded_geom`,
    );
    const encodedGeom = encodingQuery.rows[0].encoded_geom;
    const result = await this.db
      .insert(taxLot)
      .values({
        id: row.id,
        geom: encodedGeom as unknown as Polygon,
      })
      .returning({ id: taxLot.id });
    return result[0];
  }

  async update(id: string, values: { geom: Polygon }): Promise<{ id: string }> {
    const encodingQuery = await this.db.execute(
      sql<string>`select ST_GeomFromGeoJSON(${values.geom}) as encoded_geom`,
    );
    const encodedGeom = encodingQuery.rows[0]
      .encoded_geom as unknown as Polygon;
    console.info('encoded', encodedGeom);
    const result = await this.db
      .update(taxLot)
      .set({
        geom: encodedGeom,
      })
      .where(eq(taxLot.id, id))
      .returning({ id: taxLot.id });
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(taxLot).where(eq(taxLot.id, id));
  }
}
