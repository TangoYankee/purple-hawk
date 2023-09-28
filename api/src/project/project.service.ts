import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DbType } from 'src/global/providers/db.provider';
import { InsertProject, project, SelectProject } from 'src/schema/project';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async list(): Promise<SelectProject[]> {
    return this.db.select().from(project);
  }

  async getById(id: string): Promise<SelectProject> {
    const result = await this.db
      .select()
      .from(project)
      .where(eq(project.id, id));
    return result.length === 0 ? null : result[0];
  }

  async create(row: InsertProject): Promise<{ id: string }> {
    const result = await this.db
      .insert(project)
      .values(row)
      .returning({ id: project.id });
    const {
      [0]: { id },
    } = result;
    return { id };
  }
}
