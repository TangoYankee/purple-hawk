import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectNeighborhood, neighborhood } from 'src/schema/neighborhood';

@Injectable()
export class NeighborhoodService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<Partial<SelectNeighborhood>>> {
    return await this.db
      .select({
        id: neighborhood.id,
        name: neighborhood.name,
      })
      .from(neighborhood);
  }

  async getById(id: number): Promise<Partial<SelectNeighborhood>> {
    const result = await this.db
      .select({
        id: neighborhood.id,
        name: neighborhood.name,
      })
      .from(neighborhood)
      .where(eq(neighborhood.id, id));
    return result[0];
  }
}
