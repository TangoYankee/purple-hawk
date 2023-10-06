import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { Polygon } from '../../drizzle-pgis/types';
import { DbType, DB } from 'src/global/providers/db.provider';
import { projectSiteToTaxLot } from 'src/schema/project-site-tax-lot';
import { taxLot } from 'src/schema/tax-lot';

@Injectable()
export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<{ id: string; wgs84: Polygon }>> {
    const result = await this.db
      .select({
        id: taxLot.id,
        wgs84: sql<string>`ST_AsGeoJSON(${taxLot.wgs84})`,
      })
      .from(taxLot);
    return result.map(({ id, wgs84 }) => ({
      id,
      wgs84: JSON.parse(wgs84) as Polygon,
    }));
  }

  async getById(id: string): Promise<{ id: string; wgs84: Polygon }> {
    const result = await this.db
      .select({
        id: taxLot.id,
        wgs84: sql<string>`ST_AsGeoJSON(${taxLot.wgs84})`,
      })
      .from(taxLot)
      .where(eq(taxLot.id, id));
    return result.map(({ id, wgs84 }) => ({
      id,
      wgs84: JSON.parse(wgs84) as Polygon,
    }))[0];
  }

  async create(row: { id: string; wgs84: Polygon }): Promise<{ id: string }> {
    const encodingQuery = await this.db.execute(
      sql<string>`select ST_GeomFromGeoJSON(${row.wgs84})::geography as encoded_geog`,
    );
    const encodedGeog = encodingQuery.rows[0].encoded_geog;
    const result = await this.db
      .insert(taxLot)
      .values({
        id: row.id,
        wgs84: encodedGeog as unknown as Polygon,
      })
      .returning({ id: taxLot.id });
    return result[0];
  }

  async update(
    id: string,
    values: { wgs84: Polygon },
  ): Promise<{ id: string }> {
    const encodingQuery = await this.db.execute(
      sql<string>`select ST_GeomFromGeoJSON(${values.wgs84})::geography as encoded_geog`,
    );
    const encodedGeog = encodingQuery.rows[0]
      .encoded_geom as unknown as Polygon;
    const result = await this.db
      .update(taxLot)
      .set({
        wgs84: encodedGeog,
      })
      .where(eq(taxLot.id, id))
      .returning({ id: taxLot.id });
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(projectSiteToTaxLot)
      .where(eq(projectSiteToTaxLot.taxLotId, id));
    await this.db.delete(taxLot).where(eq(taxLot.id, id));
  }
}
