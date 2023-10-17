import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectLandUse, landUse } from 'src/schema/land-use';

@Injectable()
export class LandUseService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectLandUse>> {
    return await this.db.select().from(landUse);
  }

  async getByCode(code: string): Promise<SelectLandUse> {
    const result = await this.db
      .select({
        code: landUse.code,
        category: landUse.category,
      })
      .from(landUse)
      .where(eq(landUse.code, code));
    return result[0];
  }
}
