import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectBorough, borough } from 'src/schema/borough';

@Injectable()
export class BoroughService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectBorough>> {
    return await this.db.select().from(borough);
  }

  async getById(id: string): Promise<SelectBorough> {
    const result = await this.db
      .select({
        id: borough.id,
        name: borough.name,
        abbr: borough.abbr,
      })
      .from(borough)
      .where(eq(borough.id, id));
    return result[0];
  }
}
