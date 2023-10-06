export * from 'geojson';
export type SimpleFeature =
  | 'point'
  | 'multiPoint'
  | 'lineString'
  | 'multiLineString'
  | 'polygon'
  | 'multiPolygon'
  | 'geometryCollection';
