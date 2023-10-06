import { customType } from '.';
import {
  SimpleFeature,
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
  <T extends Geometry>(sf: SimpleFeature) =>
  (name: string, srid = 3857) =>
    customType<{ data: T }>({
      dataType() {
        return `geometry(${sf},${srid})`;
      },
    })(name);

export const pointGeom = geometry<Point>('point');

export const multiPointGeom = geometry<MultiPoint>('point');

export const lineStringGeom = geometry<LineString>('lineString');

export const multiLineStringGeom = geometry<MultiLineString>('multiLineString');

export const polygonGeom = geometry<Polygon>('polygon');

export const multiPolygonGeom = geometry<MultiPolygon>('multiPolygon');

export const geometryCollectionGeom =
  geometry<GeometryCollection>('geometryCollection');
