import { GeoJsonProperties, Geometry, Feature } from './types';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

export const resultAsGeoJSON = <
  G extends Geometry,
  P extends GeoJsonProperties,
  R extends P,
>(
  result: R,
  featureKey: string,
  idKey?: string,
): Feature<G, P> => {
  if (!result.hasOwnProperty(featureKey))
    throw new Error('spatial feature key not found in result object');
  if (idKey !== undefined && !result.hasOwnProperty(idKey))
    throw new Error('id key not found in result object');

  const id: string = idKey ? result[idKey] : uuidv4();
  const geometry = JSON.parse(result[featureKey]) as G;

  const resultDeepClone = cloneDeep(result);
  delete resultDeepClone[featureKey];
  if (idKey !== undefined) delete resultDeepClone[idKey];

  return {
    id,
    type: 'Feature',
    properties: resultDeepClone,
    geometry,
  };
};
