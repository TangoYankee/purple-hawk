import { customType } from '.';
import {
  GeometryKey,
  Geometry,
  Point,
  LineString,
  MultiLineString,
  GeometryCollection,
  MultiPolygon,
  Polygon,
  MultiPoint,
} from './types';

export const geometry =
  <T extends Geometry>(geometryKey: GeometryKey) =>
  (name: string, srid = 4326) => {
    return customType<{ data: T }>({
      dataType() {
        return `geometry(${geometryKey},${srid})`;
      },
    })(name);
  };

export const point = geometry<Point>('point');

export const multiPoint = geometry<MultiPoint>('point');

export const lineString = geometry<LineString>('lineString');

export const multiLineString = geometry<MultiLineString>('multiLineString');

export const polygon = geometry<Polygon>('polygon');

export const multiPolygon = geometry<MultiPolygon>('multiPolygon');

export const geometryCollection =
  geometry<GeometryCollection>('geometryCollection');
