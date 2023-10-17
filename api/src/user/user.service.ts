import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { InsertUser, SelectUser, user } from 'src/schema/user';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<SelectUser>> {
    return await this.db
      .select({
        id: user.id,
        name: user.name,
      })
      .from(user);
  }

  async getById(id: string): Promise<SelectUser> {
    const result = await this.db
      .select({
        id: user.id,
        name: user.name,
      })
      .from(user)
      .where(eq(user.id, id));
    return result[0];
  }

  async create(row: InsertUser): Promise<SelectUser> {
    const result = await this.db.insert(user).values(row).returning();
    return result[0];
  }

  async update(id: string, values: { name: string }): Promise<SelectUser> {
    const result = await this.db
      .update(user)
      .set(values)
      .where(eq(user.id, id))
      .returning();

    return result[0];
  }
}
