import { LatLng } from 'leaflet';

export class GeoUtils {
  static getDistance(from: [number, number], to: [number, number]): number {
    return new LatLng(...from).distanceTo(new LatLng(...to));
  }
}
