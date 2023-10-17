import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectLotType, lotType } from 'src/schema/lot-type';

@Injectable()
export class LotTypeService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectLotType>> {
    return await this.db.select().from(lotType);
  }

  async getByCode(code: string): Promise<SelectLotType> {
    const result = await this.db
      .select()
      .from(lotType)
      .where(eq(lotType.code, code));
    return result[0];
  }
}
