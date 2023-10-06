import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DbType } from 'src/global/providers/db.provider';
import { InsertProject, project, SelectProject } from 'src/schema/project';
import { projectSiteToTaxLot } from 'src/schema/project-site-tax-lot';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<SelectProject[]> {
    return this.db.select().from(project);
  }

  async getById(id: string): Promise<SelectProject> {
    const result = await this.db
      .select()
      .from(project)
      .where(eq(project.id, id));
    return result.length === 0 ? null : result[0];
  }

  async create(row: InsertProject): Promise<SelectProject> {
    const result = await this.db.insert(project).values(row).returning();
    return result[0];
  }

  async update(
    id: string,
    values: Partial<InsertProject>,
  ): Promise<SelectProject> {
    const result = await this.db
      .update(project)
      .set(values)
      .where(eq(project.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<void> {
    const siteIdQuery = this.db
      .select({
        siteId: project.siteId,
      })
      .from(project)
      .where(eq(project.id, id));
    await this.db
      .delete(projectSiteToTaxLot)
      .where(eq(projectSiteToTaxLot.projectSiteId, siteIdQuery));
    await this.db.delete(project).where(eq(project.id, id));
  }
}
