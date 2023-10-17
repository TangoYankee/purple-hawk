import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectFresh, fresh } from 'src/schema/fresh';

@Injectable()
export class FreshService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<Partial<SelectFresh>>> {
    return await this.db
      .select({
        id: fresh.id,
        class: fresh.class,
      })
      .from(fresh);
  }

  async getById(id: number): Promise<Partial<SelectFresh>> {
    const result = await this.db
      .select({
        id: fresh.id,
        class: fresh.class,
      })
      .from(fresh)
      .where(eq(fresh.id, id));
    return result[0];
  }
}
