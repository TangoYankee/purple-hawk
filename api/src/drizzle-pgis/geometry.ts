import { customType } from '.';
import { Point, Polygon } from './types';

type SimpleFeature = Point | Polygon;
interface GeometryConfig {
  simpleFeatureLabel: 'point' | 'polygon';
}

export const geometry = <T extends SimpleFeature>(
  name: string,
  config: GeometryConfig,
) =>
  customType<{ data: T; config: GeometryConfig }>({
    dataType(config) {
      return `geometry(${config.simpleFeatureLabel})`;
    },
  })(name, config);
