import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from 'src/global/providers/db.provider';
import { InsertProject, project, SelectProject } from 'src/schema/project';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async list(): Promise<SelectProject[]> {
    return this.db.select().from(project);
  }
}
