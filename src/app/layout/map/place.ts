export interface Place {
  readonly id: number;
  readonly name: string;
  readonly type: PlaceType;
  readonly coordinates: [number, number];
}

export enum PlaceType {
  Office = 'office',
  Cafe = 'cafe',
  Store = 'store'
}
