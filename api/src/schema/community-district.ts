import { pgTable, serial, char } from 'drizzle-orm/pg-core';
import { borough } from './borough';
import { multiPolygonGeog, multiPolygonGeom } from '../../drizzle-pgis';
import { z } from 'zod';
import { MultiPolygonSchema } from 'src/zod-geojson';
import { createZodDto } from 'nestjs-zod';
import { createSelectSchema } from 'drizzle-zod';

export const communityDistrict = pgTable('community_district', {
  id: serial('id').primaryKey(),
  borough: char('borough', { length: 1 })
    .notNull()
    .references(() => borough.id),
  code: char('code', { length: 2 }).notNull(),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});

export const SelectCommunityDistrictSchema = createSelectSchema(
  communityDistrict,
  {
    wgs84: MultiPolygonSchema,
    lift: MultiPolygonSchema,
  },
);

export const SelectCommunityDistrictDto = createZodDto(
  SelectCommunityDistrictSchema,
);

export type SelectCommunityDistrictType = z.infer<
  typeof SelectCommunityDistrictSchema
>;

export const SelectCommunityDistrictFieldSchema =
  SelectCommunityDistrictSchema.pick({
    id: true,
    borough: true,
    code: true,
  });

export const SelectCommunityDistrictFieldDto = createZodDto(
  SelectCommunityDistrictFieldSchema,
);

export type SelectCommunityDistrictFieldType = z.infer<
  typeof SelectCommunityDistrictFieldSchema
>;

export const SelectCommunityDistrictFeatureSchema =
  SelectCommunityDistrictSchema.pick({ id: true }).merge(
    z.object({
      type: z.literal('Feature'),
      properties: SelectCommunityDistrictSchema.pick({
        borough: true,
        code: true,
      }),
      geometry: MultiPolygonSchema,
    }),
  );

export const SelectCommunityDistrictFeatureDto = createZodDto(
  SelectCommunityDistrictFeatureSchema,
);

export type SelectCommunityDistrictFeatureType = z.infer<
  typeof SelectCommunityDistrictFeatureSchema
>;
