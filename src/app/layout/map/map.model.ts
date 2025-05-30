import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, combineLatest, take } from 'rxjs';

import { Place, PlaceType } from './place';
import { User } from './user';
import { MapService } from './map.service';
import { GeoUtils } from './geo-utils';

@Injectable({ providedIn: 'root' })
export class MapModel {
  //#region Places
  private readonly placesSubject = new BehaviorSubject<ReadonlyArray<Place>>([]);
  readonly places$ = this.placesSubject.asObservable();

  private readonly selectedPlaceIdSubject = new BehaviorSubject<number | null>(null);
  readonly setSelectedPlaceId = (id: number) => {
    this.setDetailsPanelOpen(true);
    this.selectedPlaceIdSubject.next(id);
  }

  readonly selectedPlace$ = combineLatest([
    this.places$,
    this.selectedPlaceIdSubject
  ]).pipe(
    map(([places, selectedId]) => {
      if (selectedId == null) return null;
      return places.find(place => place.id === selectedId) ?? null;
    }),
    shareReplay(1)
  );

  mockAddPlace(place: Omit<Place, 'id'>): void {
    const places = this.placesSubject.getValue();
    const id = places.length + 1;
    this.placesSubject.next([...places, { id, ...place }]);

    this.setSelectedPlaceId(id);
  }
  //#endregion

  //#region Users
  readonly users$: Observable<ReadonlyArray<User>>;
  readonly highlightedUserIds$: Observable<ReadonlyArray<number>>
  //#endregion

  constructor(mapService: MapService) {
    mapService.getPlaces()
      .pipe(take(1), map(x => x as unknown as ReadonlyArray<Place>))
      .subscribe(places => this.placesSubject.next(places));

    this.users$ = mapService.getUserMarkers().pipe(
      map(users => users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        coordinates: [parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)] as [number, number]
      }))),
      shareReplay(1)
    );

    this.highlightedUserIds$ = combineLatest([
      this.selectedPlace$,
      this.users$
    ]).pipe(
      map(([place, users]) => {
        if (!place) return [];

        return users
          .map(({ id, coordinates }) => ({
            id,
            distance: GeoUtils.getDistance(place.coordinates, coordinates)
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3)
          .map(({ id }) => id);
      }),
      shareReplay(1)
    );
  }

  //#region Filtration
  private readonly typesFilterSubject = new BehaviorSubject<ReadonlyArray<PlaceType>>(Object.values(PlaceType));
  readonly typesFilter$ = this.typesFilterSubject.asObservable();

  addTypeToFilter(type: PlaceType): void {
    const types = this.typesFilterSubject.value;
    if (!types.includes(type)) this.typesFilterSubject.next([...types, type]);
  }
  removeTypeFromFilter(type: PlaceType): void {
    const updated = this.typesFilterSubject.value.filter(t => t !== type);
    this.typesFilterSubject.next(updated);
  }
  resetTypesFilter(): void {
    this.typesFilterSubject.next(Object.values(PlaceType));
  }
  //#endregion

  //#region Details Panel
  private readonly isDetailsPanelOpenSubject = new BehaviorSubject<boolean>(false);
  readonly isDetailsPanelOpen$ = this.isDetailsPanelOpenSubject.asObservable();
  setDetailsPanelOpen = (isOpen: boolean) => this.isDetailsPanelOpenSubject.next(isOpen);
  //#endregion
}
