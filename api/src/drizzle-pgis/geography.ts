import { customType } from '.';
import {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  SimpleFeature,
} from './types';

export const geography =
  <T extends Geometry>(sf: SimpleFeature) =>
  (name: string, srid = 4326) =>
    customType<{ data: T }>({
      dataType() {
        return `geography(${sf}, ${srid})`;
      },
    })(name);

export const pointGeog = geography<Point>('point');

export const multiPointGeog = geography<MultiPoint>('multiPoint');

export const lineStringGeog = geography<LineString>('lineString');

export const multiLineStringGeog =
  geography<MultiLineString>('multiLineString');

export const polygonGeog = geography<Polygon>('polygon');

export const multiPolygonGeog = geography<MultiPolygon>('multiPolygon');

export const geometryCollectionGeog =
  geography<GeometryCollection>('geometryCollection');
