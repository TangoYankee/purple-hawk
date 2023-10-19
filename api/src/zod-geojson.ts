import { z } from 'zod';

export const PositionSchema = z.number().array().min(2).max(3);

export const PointSchema = z.object({
  type: z.literal('Point'),
  coordinates: PositionSchema,
});

export const MultiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(PositionSchema))),
});
